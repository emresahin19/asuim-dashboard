'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import type { CameraPosition, CameraBackground } from '../types';
import {
  CAMERA_W, CAMERA_H,
  COMPOSITOR_W, COMPOSITOR_H,
  PIP_MARGIN, PIP_SIZES,
} from '../constants';

function defaultPosition(): CameraPosition {
  const { w, h } = PIP_SIZES['medium'];
  return { x: COMPOSITOR_W - w - PIP_MARGIN, y: COMPOSITOR_H - h - PIP_MARGIN, w, h };
}

export function useCamera() {
  // offscreen canvas — compositor reads from this each frame
  const cameraCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef          = useRef<CanvasRenderingContext2D | null>(null);

  const videoElRef    = useRef<HTMLVideoElement | null>(null);
  const streamRef     = useRef<MediaStream | null>(null);
  const segmenterRef  = useRef<any>(null);
  const rafRef        = useRef<number>(0);
  const processingRef = useRef(false);

  // mutable flags — read by rAF loop without triggering re-renders
  const bgRemovalRef  = useRef(false);
  const isMirroredRef = useRef(false);
  const positionRef   = useRef<CameraPosition>(defaultPosition());
  const cameraBgRef   = useRef<CameraBackground | null>(null);

  const [isActive,   setIsActive]   = useState(false);
  const [bgRemoval,  setBgRemoval]  = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [cameraBg,   setCameraBgState] = useState<CameraBackground | null>(null);
  const [,           setPositionState] = useState<CameraPosition>(defaultPosition());

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width  = CAMERA_W;
    canvas.height = CAMERA_H;
    cameraCanvasRef.current = canvas;
    ctxRef.current = canvas.getContext('2d')!;
    return () => {
      cameraCanvasRef.current = null;
      ctxRef.current = null;
    };
  }, []);

  // draw raw video frame (no bg removal)
  const drawRawFrame = useCallback(() => {
    const ctx   = ctxRef.current;
    const video = videoElRef.current;
    if (!ctx || !video || video.readyState < 2) return;
    ctx.save();
    ctx.clearRect(0, 0, CAMERA_W, CAMERA_H);
    if (isMirroredRef.current) {
      ctx.translate(CAMERA_W, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, CAMERA_W, CAMERA_H);
    ctx.restore();
  }, []);

  // lazy-load MediaPipe LITE model
  const loadSegmenter = useCallback(async () => {
    if (segmenterRef.current) return;
    const { SelfieSegmentation } = await import('@mediapipe/selfie_segmentation');
    const seg = new SelfieSegmentation({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`,
    });
    seg.setOptions({ modelSelection: 0 }); // 0 = LITE, faster
    seg.onResults((results: any) => {
      const ctx = ctxRef.current;
      if (!ctx) { processingRef.current = false; return; }
      ctx.save();
      ctx.clearRect(0, 0, CAMERA_W, CAMERA_H);
      if (isMirroredRef.current) {
        ctx.translate(CAMERA_W, 0);
        ctx.scale(-1, 1);
      }
      // mask → source-in → only person pixels remain
      ctx.drawImage(results.segmentationMask, 0, 0, CAMERA_W, CAMERA_H);
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(results.image, 0, 0, CAMERA_W, CAMERA_H);
      ctx.restore();

      // Kamera arka planı — kişinin altına çiz (destination-over)
      const bg = cameraBgRef.current;
      if (bg) {
        ctx.globalCompositeOperation = 'destination-over';
        if (bg.type === 'color') {
          ctx.fillStyle = bg.value;
          ctx.fillRect(0, 0, CAMERA_W, CAMERA_H);
        } else if (bg.type === 'image' && bg.imageEl) {
          ctx.drawImage(bg.imageEl, 0, 0, CAMERA_W, CAMERA_H);
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      processingRef.current = false;
    });
    await seg.initialize();
    segmenterRef.current = seg;
  }, []);

  const processLoop = useCallback(() => {
    const video = videoElRef.current;
    if (video && video.readyState >= 2) {
      if (bgRemovalRef.current && segmenterRef.current && !processingRef.current) {
        processingRef.current = true;
        segmenterRef.current.send({ image: video });
      } else if (!bgRemovalRef.current) {
        drawRawFrame();
      }
    }
    rafRef.current = requestAnimationFrame(processLoop);
  }, [drawRawFrame]);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width:     { ideal: CAMERA_W },
          height:    { ideal: CAMERA_H },
          frameRate: { ideal: 30 },
        },
        audio: false,
      });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      await video.play();
      videoElRef.current = video;
      streamRef.current  = stream;
      setIsActive(true);
      rafRef.current = requestAnimationFrame(processLoop);
    } catch {
      // kullanıcı izin vermedi
    }
  }, [processLoop]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current  = null;
    videoElRef.current = null;
    ctxRef.current?.clearRect(0, 0, CAMERA_W, CAMERA_H);
    setIsActive(false);
  }, []);

  const toggleBgRemoval = useCallback(async () => {
    if (!bgRemovalRef.current) await loadSegmenter();
    bgRemovalRef.current = !bgRemovalRef.current;
    setBgRemoval(v => !v);
  }, [loadSegmenter]);

  const toggleMirror = useCallback(() => {
    isMirroredRef.current = !isMirroredRef.current;
    setIsMirrored(v => !v);
  }, []);

  const setPosition = useCallback((pos: CameraPosition) => {
    positionRef.current = pos;
    setPositionState(pos);
  }, [positionRef]);

  const setCameraBackground = useCallback((bg: CameraBackground | null) => {
    if (cameraBgRef.current?.src) URL.revokeObjectURL(cameraBgRef.current.src);
    cameraBgRef.current = bg;
    setCameraBgState(bg);
  }, []);

  return {
    cameraCanvasRef,
    isActive,
    bgRemoval,
    isMirrored,
    cameraBg,
    positionRef,
    start,
    stop,
    toggleBgRemoval,
    toggleMirror,
    setPosition,
    setCameraBackground,
  };
}
