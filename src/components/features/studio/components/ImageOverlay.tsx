'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import type { OverlayImage } from '../types';
import { COMPOSITOR_W, COMPOSITOR_H } from '../constants';
import styles from '../studio.module.scss';

const MIN_W = 80;
const MIN_H = 45;

type Corner = 'tl' | 'tr' | 'bl' | 'br';

const CORNER_CLASS: Record<Corner, string> = {
  tl: styles.resizeHandleTL,
  tr: styles.resizeHandleTR,
  bl: styles.resizeHandleBL,
  br: styles.resizeHandleBR,
};

interface ImageBoxProps {
  image:        OverlayImage;
  scaleRef:     React.RefObject<{ sx: number; sy: number }>;
  scale:        { sx: number; sy: number };
  imagesRef:    React.RefObject<OverlayImage[]>;
  isCursorTool: boolean;
  isSelected:   boolean;
  onSelect:     () => void;
  onRemove:     (id: string) => void;
}

function ImageBox({ image, scaleRef, scale, imagesRef, isCursorTool, isSelected, onSelect, onRemove }: ImageBoxProps) {
  const [pos, setPos] = useState(() => ({ ...image.position }));

  const iRef = useRef<{
    mode:     'drag' | Corner | null;
    startMX:  number;
    startMY:  number;
    startPos: OverlayImage['position'];
  }>({ mode: null, startMX: 0, startMY: 0, startPos: { ...image.position } });

  const applyMove = useCallback((clientX: number, clientY: number) => {
    const d = iRef.current;
    if (!d.mode) return;
    const { sx, sy } = scaleRef.current!;
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
    const item = imagesRef.current?.find(i => i.id === image.id);
    if (item) item.position = np;
    setPos(np);
  }, [image.id, imagesRef, scaleRef]);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (iRef.current.mode) applyMove(e.clientX, e.clientY);
  }, [applyMove]);

  const onUp = useCallback(() => { iRef.current.mode = null; }, []);

  const onDragStart = useCallback((e: React.PointerEvent) => {
    if (!isCursorTool) return;
    e.stopPropagation();
    onSelect();
    iRef.current = { mode: 'drag', startMX: e.clientX, startMY: e.clientY, startPos: { ...pos } };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos, isCursorTool, onSelect]);

  const onResizeStart = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const corner = e.currentTarget.dataset.corner as Corner;
    iRef.current = { mode: corner, startMX: e.clientX, startMY: e.clientY, startPos: { ...pos } };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [pos]);

  const { sx, sy } = scale;

  return (
    <div
      className={`${styles.imageOverlayBox} ${isCursorTool ? styles.imageOverlayBoxCursor : ''} ${isSelected ? styles.imageOverlayBoxSelected : ''}`}
      style={{
        left:          pos.x * sx,
        top:           pos.y * sy,
        width:         pos.w * sx,
        height:        pos.h * sy,
        pointerEvents: isCursorTool ? 'all' : 'none',
      }}
      onPointerDown={onDragStart}
      onPointerMove={onMove}
      onPointerUp={onUp}
    >
      {isSelected && (
        <>
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
          <button
            className={styles.imageDeleteBtn}
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onRemove(image.id); }}
            title="Görseli kaldır"
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
}

interface Props {
  compositorCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  images:       OverlayImage[];
  imagesRef:    React.RefObject<OverlayImage[]>;
  isCursorTool: boolean;
  onRemove:     (id: string) => void;
}

export function ImageOverlay({ compositorCanvasRef, images, imagesRef, isCursorTool, onRemove }: Props) {
  const [scale, setScale] = useState({ sx: 1, sy: 1 });
  const scaleRef = useRef({ sx: 1, sy: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Deselect when leaving cursor tool
  useEffect(() => {
    if (!isCursorTool) setSelectedId(null);
  }, [isCursorTool]);

  // Click-outside deselect
  useEffect(() => {
    if (!isCursorTool) return;
    const onDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedId(null);
      }
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
  }, [isCursorTool]);

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

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.cameraOverlay}>
      {images.map(img => (
        <ImageBox
          key={img.id}
          image={img}
          scale={scale}
          scaleRef={scaleRef}
          imagesRef={imagesRef}
          isCursorTool={isCursorTool}
          isSelected={selectedId === img.id}
          onSelect={() => setSelectedId(img.id)}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
