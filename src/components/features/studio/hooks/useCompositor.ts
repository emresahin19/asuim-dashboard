'use client';
import { useEffect, useRef } from 'react';
import { COMPOSITOR_W, COMPOSITOR_H } from '../constants';
import type { CameraPosition, OverlayImage } from '../types';

interface CompositorProps {
  compositorCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawingCanvasRef:    React.RefObject<HTMLCanvasElement | null>;
  screenVideoElRef:    React.RefObject<HTMLVideoElement | null>;
  cameraCanvasElRef:   React.RefObject<HTMLCanvasElement | null>;
  isScreenActiveRef:   React.RefObject<boolean>;
  isCameraActiveRef:   React.RefObject<boolean>;
  cameraPositionRef:   React.RefObject<CameraPosition>;
  imagesRef:           React.RefObject<OverlayImage[]>;
}

export function useCompositor({
  compositorCanvasRef,
  drawingCanvasRef,
  screenVideoElRef,
  cameraCanvasElRef,
  isScreenActiveRef,
  isCameraActiveRef,
  cameraPositionRef,
  imagesRef,
}: CompositorProps) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = compositorCanvasRef.current;
    if (!canvas) return;

    canvas.width  = COMPOSITOR_W;
    canvas.height = COMPOSITOR_H;
    const ctx = canvas.getContext('2d', { alpha: false })!;

    function tick() {
      // 1. Arka plan
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, COMPOSITOR_W, COMPOSITOR_H);

      // 2. Ekran paylaşımı
      const sv = screenVideoElRef.current;
      if (isScreenActiveRef.current && sv && sv.readyState >= 2) {
        ctx.drawImage(sv, 0, 0, COMPOSITOR_W, COMPOSITOR_H);
      } else {
        ctx.fillStyle = 'oklch(0.985 0 0)';
        ctx.fillRect(0, 0, COMPOSITOR_W, COMPOSITOR_H);
        ctx.fillStyle = 'oklch(0.442 0.017 285.786)';
        ctx.font = 'bold 16px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          'Ekran paylaşımını başlatmak için "Ekran Paylaş" butonuna tıklayın',
          COMPOSITOR_W / 2,
          COMPOSITOR_H / 2,
        );
        ctx.textAlign    = 'left';
        ctx.textBaseline = 'alphabetic';
      }

      // 3. Görsel overlay katmanı
      for (const img of imagesRef.current) {
        const { x, y, w, h } = img.position;
        ctx.save();
        ctx.beginPath();
        (ctx as any).roundRect(x, y, w, h, 6);
        ctx.clip();
        ctx.drawImage(img.imageEl, x, y, w, h);
        ctx.restore();
      }

      // 4. Kamera PiP
      const camCanvas = cameraCanvasElRef.current;
      if (isCameraActiveRef.current && camCanvas) {
        const { x, y, w, h } = cameraPositionRef.current;
        ctx.save();
        ctx.beginPath();
        (ctx as any).roundRect(x, y, w, h, 10);
        ctx.clip();
        ctx.drawImage(camCanvas, x, y, w, h);
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth   = 2;
        ctx.beginPath();
        (ctx as any).roundRect(x, y, w, h, 10);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Çizim katmanı (kayda yansır)
      const dCanvas = drawingCanvasRef.current;
      if (dCanvas) {
        ctx.drawImage(dCanvas, 0, 0, COMPOSITOR_W, COMPOSITOR_H);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // tüm değerler ref — yeniden başlatmaya gerek yok
}
