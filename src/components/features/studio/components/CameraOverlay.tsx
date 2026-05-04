'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import type { CameraPosition } from '../types';
import { COMPOSITOR_W, COMPOSITOR_H } from '../constants';
import styles from '../studio.module.scss';

const MIN_W = 120;
const MIN_H = 68;

type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface Props {
  compositorCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  isActive:            boolean;
  positionRef:         React.MutableRefObject<CameraPosition>;
}

const CORNER_CLASS: Record<Corner, string> = {
  tl: styles.resizeHandleTL,
  tr: styles.resizeHandleTR,
  bl: styles.resizeHandleBL,
  br: styles.resizeHandleBR,
};

export function CameraOverlay({ compositorCanvasRef, isActive, positionRef }: Props) {
  const [pos,   setPos]   = useState<CameraPosition>(() => ({ ...positionRef.current }));
  const scaleRef          = useRef({ sx: 1, sy: 1 });
  const [scale, setScale] = useState({ sx: 1, sy: 1 });

  // positionRef dışarıda değişince overlay'i senkronize et
  useEffect(() => {
    if (isActive) setPos({ ...positionRef.current });
  }, [isActive, positionRef]);

  // Canvas boyutunu izle → compositor↔display ölçek faktörü
  useEffect(() => {
    const canvas = compositorCanvasRef.current;
    if (!canvas) return;
    const update = () => {
      const r = canvas.getBoundingClientRect();
      const s = { sx: r.width / COMPOSITOR_W, sy: r.height / COMPOSITOR_H };
      scaleRef.current = s;
      setScale(s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [compositorCanvasRef]);

  const iRef = useRef<{
    mode:     'drag' | Corner | null;
    startMX:  number;
    startMY:  number;
    startPos: CameraPosition;
  }>({ mode: null, startMX: 0, startMY: 0, startPos: { x: 0, y: 0, w: 0, h: 0 } });

  const applyMove = useCallback((clientX: number, clientY: number) => {
    const d = iRef.current;
    if (!d.mode) return;

    const { sx, sy } = scaleRef.current;
    const dx = (clientX - d.startMX) / sx;
    const dy = (clientY - d.startMY) / sy;
    const s  = d.startPos;
    let { x, y, w, h } = s;

    if (d.mode === 'drag') {
      x = Math.max(0, Math.min(COMPOSITOR_W - w, s.x + dx));
      y = Math.max(0, Math.min(COMPOSITOR_H - h, s.y + dy));
    } else {
      switch (d.mode) {
        case 'br': w = Math.max(MIN_W, s.w + dx); h = Math.max(MIN_H, s.h + dy); break;
        case 'bl': w = Math.max(MIN_W, s.w - dx); x = s.x + (s.w - w); h = Math.max(MIN_H, s.h + dy); break;
        case 'tr': w = Math.max(MIN_W, s.w + dx); h = Math.max(MIN_H, s.h - dy); y = s.y + (s.h - h); break;
        case 'tl': w = Math.max(MIN_W, s.w - dx); x = s.x + (s.w - w); h = Math.max(MIN_H, s.h - dy); y = s.y + (s.h - h); break;
      }
      x = Math.max(0, Math.min(COMPOSITOR_W - w, x));
      y = Math.max(0, Math.min(COMPOSITOR_H - h, y));
    }

    const np = { x, y, w, h };
    positionRef.current = np;
    setPos(np);
  }, [positionRef]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (iRef.current.mode) applyMove(e.clientX, e.clientY);
  }, [applyMove]);

  const onUp = useCallback(() => { iRef.current.mode = null; }, []);

  const onDragStart = useCallback((e: React.PointerEvent) => {
    iRef.current = { mode: 'drag', startMX: e.clientX, startMY: e.clientY, startPos: { ...positionRef.current } };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [positionRef]);

  const onResizeStart = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const corner = e.currentTarget.dataset.corner as Corner;
    iRef.current = { mode: corner, startMX: e.clientX, startMY: e.clientY, startPos: { ...positionRef.current } };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [positionRef]);

  if (!isActive) return null;

  const { sx, sy } = scale;

  return (
    <div className={styles.cameraOverlay}>
      <div
        className={styles.cameraOverlayBox}
        style={{ left: pos.x * sx, top: pos.y * sy, width: pos.w * sx, height: pos.h * sy }}
        onPointerDown={onDragStart}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        {(['tl', 'tr', 'bl', 'br'] as Corner[]).map(c => (
          <div
            key={c}
            data-corner={c}
            className={`${styles.resizeHandle} ${CORNER_CLASS[c]}`}
            onPointerDown={onResizeStart}
            onPointerMove={onMove}
            onPointerUp={onUp}
          />
        ))}
      </div>
    </div>
  );
}
