'use client';
import { useRef, useState, useCallback } from 'react';
import { COMPOSITOR_W, COMPOSITOR_H } from '../constants';
import type { OverlayImage } from '../types';

const MAX_W = COMPOSITOR_W * 0.5;
const MAX_H = COMPOSITOR_H * 0.5;

export function useImages() {
  const [images, setImages] = useState<OverlayImage[]>([]);
  const imagesRef = useRef<OverlayImage[]>([]);

  const sync = useCallback((list: OverlayImage[]) => {
    imagesRef.current = list;
    setImages(list);
  }, []);

  const addImage = useCallback((file: File) => {
    const src = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const scale = Math.min(MAX_W / w, MAX_H / h, 1);
      w = Math.round(w * scale);
      h = Math.round(h * scale);
      const x = Math.round((COMPOSITOR_W - w) / 2);
      const y = Math.round((COMPOSITOR_H - h) / 2);
      const overlay: OverlayImage = {
        id: crypto.randomUUID(),
        imageEl: img,
        src,
        position: { x, y, w, h },
      };
      const next = [...imagesRef.current, overlay];
      sync(next);
    };
    img.src = src;
  }, [sync]);

  const removeImage = useCallback((id: string) => {
    const found = imagesRef.current.find(i => i.id === id);
    if (found) URL.revokeObjectURL(found.src);
    sync(imagesRef.current.filter(i => i.id !== id));
  }, [sync]);

  return { images, imagesRef, addImage, removeImage };
}
