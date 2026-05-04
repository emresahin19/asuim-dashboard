'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 5;

export function useWhiteboard(wrapRef: React.RefObject<HTMLDivElement | null>) {
  const zoomRef        = useRef(1);
  const panRef         = useRef({ x: 0, y: 0 });
  const isPanningRef   = useRef(false);
  const lastPanPtRef   = useRef({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);
  const [pan,  setPan]  = useState({ x: 0, y: 0 });

  // Wheel zoom toward cursor — must be non-passive to call preventDefault
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // cursor position relative to element top-left (CSS px, before transform)
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const oldZ = zoomRef.current;
    const d    = e.deltaY < 0 ? 1.1 : 0.9;
    const newZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldZ * d));

    // keep canvas point under cursor fixed: newPan = cx - (cx - pan) * (newZ/oldZ)
    const newPanX = cx - (cx - panRef.current.x) * (newZ / oldZ);
    const newPanY = cy - (cy - panRef.current.y) * (newZ / oldZ);

    zoomRef.current = newZ;
    panRef.current  = { x: newPanX, y: newPanY };
    setZoom(newZ);
    setPan({ x: newPanX, y: newPanY });
  }, [wrapRef]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [wrapRef, handleWheel]);

  // Right-click drag pan
  const onContextMenu = useCallback((e: React.MouseEvent) => { e.preventDefault(); }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 2) return;
    e.preventDefault();
    isPanningRef.current  = true;
    lastPanPtRef.current  = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    const dx = e.clientX - lastPanPtRef.current.x;
    const dy = e.clientY - lastPanPtRef.current.y;
    lastPanPtRef.current = { x: e.clientX, y: e.clientY };
    const next = { x: panRef.current.x + dx, y: panRef.current.y + dy };
    panRef.current = next;
    setPan({ ...next });
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (e.button === 2) isPanningRef.current = false;
  }, []);

  const onMouseLeave = useCallback(() => { isPanningRef.current = false; }, []);

  const resetView = useCallback(() => {
    zoomRef.current = 1;
    panRef.current  = { x: 0, y: 0 };
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  return { zoom, pan, onContextMenu, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, resetView };
}
