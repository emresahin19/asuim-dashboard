'use client';
import { useRef, useState, useCallback } from 'react';

export function useScreenShare() {
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const streamRef  = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: { ideal: 30, max: 30 },
          width:     { ideal: 1280 },
          height:    { ideal: 720 },
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

      stream.getVideoTracks()[0].addEventListener('ended', () => {
        videoElRef.current = null;
        streamRef.current  = null;
        setIsActive(false);
      });
    } catch {
      // kullanıcı iptal etti veya izin vermedi
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current  = null;
    videoElRef.current = null;
    setIsActive(false);
  }, []);

  return { videoElRef, isActive, start, stop };
}
