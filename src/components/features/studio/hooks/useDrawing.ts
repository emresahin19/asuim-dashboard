'use client';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import type { DrawingTool, DrawingOptions, DrawingObject, StrokeObject, ShapeObject, TextObject } from '../types';
import { COMPOSITOR_W as W, COMPOSITOR_H as H } from '../constants';
import {
  renderAll, renderObject, drawSelectionOverlay, drawMarquee,
  getObjectBounds, hitTest, hitTestInRect, moveObject,
} from '../utils/drawingRenderer';

export const DRAWING_COLORS = [
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#8B5CF6', '#FFFFFF', '#000000',
];
export const DRAWING_SIZES = [2, 4, 8, 16] as const;
export const FONT_SIZES    = [12, 18, 24, 36] as const;

const DEFAULT_OPTIONS: DrawingOptions = {
  tool: 'cursor', color: '#EF4444', size: 4,
  shape: 'rect', shapeStyle: 'outline',
  fontSize: 18, fontBold: false, fontItalic: false,
};

function uid() { return Math.random().toString(36).slice(2, 9); }

// Cursor drag states
type MoveDrag = {
  type: 'move';
  ids: string[];
  startX: number; startY: number;
  startObjects: DrawingObject[];
};
type MarqueeDrag = {
  type: 'marquee';
  startX: number; startY: number;
  currentX: number; currentY: number;
};
type CursorDrag = MoveDrag | MarqueeDrag | null;

export function useDrawing(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [objects,     setObjects]     = useState<DrawingObject[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [undoStack,   setUndoStack]   = useState<DrawingObject[][]>([]);
  const [redoStack,   setRedoStack]   = useState<DrawingObject[][]>([]);
  const [options,     setOptions]     = useState<DrawingOptions>({ ...DEFAULT_OPTIONS });
  const [isActive,    setIsActive]    = useState(false);
  const [textInput,   setTextInput]   = useState<{
    canvasX: number; canvasY: number;
    w?: number; h?: number;
    editId?: string;
    existingText?: string;
  } | null>(null);

  const optionsRef       = useRef<DrawingOptions>({ ...DEFAULT_OPTIONS });
  const objectsRef       = useRef<DrawingObject[]>([]);
  const selectedIdsRef   = useRef<string[]>([]);
  const activeStrokeRef  = useRef<StrokeObject | null>(null);
  const activeShapeRef   = useRef<{ obj: ShapeObject; snapshot: ImageData } | null>(null);
  const textAreaDragRef  = useRef<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const cursorDragRef    = useRef<CursorDrag>(null);
  const committedSnapRef = useRef<ImageData | null>(null);

  useEffect(() => { objectsRef.current    = objects;     }, [objects]);
  useEffect(() => { selectedIdsRef.current = selectedIds; }, [selectedIds]);

  const getCtx = useCallback(() => canvasRef.current?.getContext('2d') ?? null, [canvasRef]);

  const redrawCommitted = useCallback((objs: DrawingObject[], selIds: string[], skipId?: string) => {
    const ctx = getCtx();
    if (!ctx) return;
    const toRender = skipId ? objs.filter(o => o.id !== skipId) : objs;
    renderAll(ctx, toRender, W, H);
    for (const id of selIds) {
      if (id === skipId) continue;
      const sel = toRender.find(o => o.id === id);
      if (sel) {
        const b = getObjectBounds(sel);
        if (b) drawSelectionOverlay(ctx, b);
      }
    }
    committedSnapRef.current = ctx.getImageData(0, 0, W, H);
  }, [getCtx]);

  useEffect(() => {
    redrawCommitted(objects, selectedIds, textInput?.editId);
  }, [objects, selectedIds, textInput, redrawCommitted]);

  const pushHistory = useCallback((prev: DrawingObject[]) => {
    setUndoStack(s => [...s.slice(-29), prev]);
    setRedoStack([]);
  }, []);

  const commitObjects = useCallback((next: DrawingObject[], clearSel = false) => {
    pushHistory(objectsRef.current);
    setObjects(next);
    if (clearSel) setSelectedIds([]);
  }, [pushHistory]);

  const toCanvas = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
  }, []);

  // ── Drawing pointer events ────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    const { tool } = optionsRef.current;
    if (tool === 'cursor') return;

    const pt = toCanvas(e);
    e.currentTarget.setPointerCapture(e.pointerId);

    if (tool === 'text') {
      textAreaDragRef.current = { startX: pt.x, startY: pt.y, currentX: pt.x, currentY: pt.y };
      return;
    }

    if (tool === 'shape') {
      const ctx = getCtx();
      if (!ctx) return;
      const snapshot = ctx.getImageData(0, 0, W, H);
      const obj: ShapeObject = {
        id: uid(), type: 'shape',
        shape:      optionsRef.current.shape,
        shapeStyle: optionsRef.current.shapeStyle,
        color:      optionsRef.current.color,
        size:       optionsRef.current.size,
        x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y,
      };
      activeShapeRef.current = { obj, snapshot };
      return;
    }

    // pen / highlighter / eraser
    const obj: StrokeObject = {
      id: uid(), type: 'stroke',
      tool:  tool as 'pen' | 'highlighter' | 'eraser',
      color: optionsRef.current.color,
      size:  optionsRef.current.size,
      points: [pt],
    };
    activeStrokeRef.current = obj;
    const ctx = getCtx();
    if (ctx) {
      const snap = committedSnapRef.current;
      if (snap) ctx.putImageData(snap, 0, 0);
      renderObject(ctx, obj);
    }
  }, [isActive, toCanvas, getCtx]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    const pt  = toCanvas(e);
    const ctx = getCtx();
    if (!ctx) return;

    if (activeStrokeRef.current) {
      activeStrokeRef.current.points.push(pt);
      const snap = committedSnapRef.current;
      if (snap) ctx.putImageData(snap, 0, 0);
      renderObject(ctx, activeStrokeRef.current);
      return;
    }

    if (activeShapeRef.current) {
      activeShapeRef.current.obj.x2 = pt.x;
      activeShapeRef.current.obj.y2 = pt.y;
      ctx.putImageData(activeShapeRef.current.snapshot, 0, 0);
      renderObject(ctx, activeShapeRef.current.obj);
      return;
    }

    if (textAreaDragRef.current) {
      textAreaDragRef.current.currentX = pt.x;
      textAreaDragRef.current.currentY = pt.y;
      const snap = committedSnapRef.current;
      if (snap) ctx.putImageData(snap, 0, 0);
      const { startX, startY, currentX, currentY } = textAreaDragRef.current;
      drawMarquee(ctx, startX, startY, currentX, currentY);
      return;
    }
  }, [isActive, toCanvas, getCtx]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    const pt = toCanvas(e);

    if (activeStrokeRef.current) {
      const stroke = activeStrokeRef.current;
      activeStrokeRef.current = null;
      if (stroke.points.length > 0) commitObjects([...objectsRef.current, stroke]);
      return;
    }

    if (activeShapeRef.current) {
      const shape = { ...activeShapeRef.current.obj, x2: pt.x, y2: pt.y };
      activeShapeRef.current = null;
      const tooSmall = Math.abs(shape.x2 - shape.x1) < 4 && Math.abs(shape.y2 - shape.y1) < 4;
      if (!tooSmall) {
        commitObjects([...objectsRef.current, shape]);
        setSelectedIds([shape.id]);
      } else {
        redrawCommitted(objectsRef.current, selectedIdsRef.current);
      }
      return;
    }

    if (textAreaDragRef.current) {
      const { startX, startY } = textAreaDragRef.current;
      const w = Math.abs(pt.x - startX);
      const h = Math.abs(pt.y - startY);
      textAreaDragRef.current = null;
      const ctx = getCtx();
      if (ctx && committedSnapRef.current) ctx.putImageData(committedSnapRef.current, 0, 0);

      if (w < 10 && h < 10) {
        // Small click: check for existing text to re-edit
        const hitId = hitTest(objectsRef.current, pt.x, pt.y);
        const existing = hitId ? objectsRef.current.find(o => o.id === hitId && o.type === 'text') : null;
        if (existing && existing.type === 'text') {
          setTextInput({ canvasX: existing.x, canvasY: existing.y - existing.fontSize, editId: existing.id, existingText: existing.text });
        } else {
          setTextInput({ canvasX: Math.min(startX, pt.x), canvasY: Math.min(startY, pt.y) });
        }
      } else {
        setTextInput({
          canvasX: Math.min(startX, pt.x),
          canvasY: Math.min(startY, pt.y),
          w, h,
        });
      }
      return;
    }
  }, [isActive, toCanvas, commitObjects, redrawCommitted, getCtx]);

  // ── Cursor tool ───────────────────────────────────────────────────────────
  const onCursorDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const pt    = toCanvas(e);
    const hitId = hitTest(objectsRef.current, pt.x, pt.y);

    if (hitId) {
      const alreadyInSel = selectedIdsRef.current.includes(hitId);
      const ids = alreadyInSel ? selectedIdsRef.current : [hitId];
      if (!alreadyInSel) setSelectedIds([hitId]);
      cursorDragRef.current = {
        type: 'move',
        ids,
        startX: pt.x, startY: pt.y,
        startObjects: objectsRef.current.filter(o => ids.includes(o.id)),
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    } else {
      setSelectedIds([]);
      cursorDragRef.current = {
        type: 'marquee',
        startX: pt.x, startY: pt.y,
        currentX: pt.x, currentY: pt.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }, [toCanvas]);

  const onCursorMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = cursorDragRef.current;
    if (!d) return;
    const ctx = getCtx();
    if (!ctx) return;
    const pt = toCanvas(e);

    if (d.type === 'marquee') {
      d.currentX = pt.x;
      d.currentY = pt.y;
      renderAll(ctx, objectsRef.current, W, H);
      drawMarquee(ctx, d.startX, d.startY, d.currentX, d.currentY);
      return;
    }

    if (d.type === 'move') {
      const dx = pt.x - d.startX;
      const dy = pt.y - d.startY;
      const movedMap = new Map(d.startObjects.map(o => [o.id, moveObject(o, dx, dy)]));
      const moved = objectsRef.current.map(o => movedMap.get(o.id) ?? o);
      renderAll(ctx, moved, W, H);
      for (const id of d.ids) {
        const obj = movedMap.get(id);
        if (obj) {
          const b = getObjectBounds(obj);
          if (b) drawSelectionOverlay(ctx, b);
        }
      }
      return;
    }
  }, [toCanvas, getCtx]);

  const onCursorUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = cursorDragRef.current;
    if (!d) return;
    const pt = toCanvas(e);
    cursorDragRef.current = null;

    if (d.type === 'marquee') {
      const w = Math.abs(d.currentX - d.startX);
      const h = Math.abs(d.currentY - d.startY);
      if (w < 4 && h < 4) {
        setSelectedIds([]);
      } else {
        const ids = hitTestInRect(objectsRef.current, d.startX, d.startY, d.currentX, d.currentY);
        setSelectedIds(ids);
      }
      return;
    }

    if (d.type === 'move') {
      const dx = pt.x - d.startX;
      const dy = pt.y - d.startY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        const movedMap = new Map(d.startObjects.map(o => [o.id, moveObject(o, dx, dy)]));
        const moved = objectsRef.current.map(o => movedMap.get(o.id) ?? o);
        commitObjects(moved);
      }
      setSelectedIds(d.ids);
      return;
    }
  }, [toCanvas, commitObjects]);

  // ── Text confirm / cancel ─────────────────────────────────────────────────
  const confirmText = useCallback((text: string) => {
    if (!textInput || !text.trim()) { setTextInput(null); return; }
    const { color, fontSize, fontBold, fontItalic } = optionsRef.current;
    if (textInput.editId) {
      const next = objectsRef.current.map(o =>
        o.id === textInput.editId ? { ...o, text, color, fontSize, fontBold, fontItalic } as TextObject : o
      );
      commitObjects(next);
    } else {
      const obj: TextObject = {
        id: uid(), type: 'text',
        text, color, fontSize, fontBold, fontItalic,
        x: textInput.canvasX,
        y: textInput.canvasY + fontSize,
      };
      const next = [...objectsRef.current, obj];
      commitObjects(next);
      setSelectedIds([obj.id]);
    }
    setTextInput(null);
  }, [textInput, commitObjects]);

  const cancelText = useCallback(() => {
    redrawCommitted(objectsRef.current, selectedIdsRef.current);
    setTextInput(null);
  }, [redrawCommitted]);

  const editTextObject = useCallback((id: string) => {
    const obj = objectsRef.current.find(o => o.id === id && o.type === 'text');
    if (!obj || obj.type !== 'text') return;
    setTextInput({ canvasX: obj.x, canvasY: obj.y - obj.fontSize, editId: obj.id, existingText: obj.text });
  }, []);

  const onCursorDoubleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    cursorDragRef.current = null;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width);
    const y = (e.clientY - r.top) * (H / r.height);
    const hitId = hitTest(objectsRef.current, x, y);
    if (!hitId) return;
    const obj = objectsRef.current.find(o => o.id === hitId && o.type === 'text');
    if (obj && obj.type === 'text') editTextObject(obj.id);
  }, [editTextObject]);

  // ── History ───────────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    setUndoStack(s => {
      if (s.length === 0) return s;
      const prev = s[s.length - 1];
      setRedoStack(r => [...r, objectsRef.current]);
      setObjects(prev);
      setSelectedIds([]);
      return s.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack(s => {
      if (s.length === 0) return s;
      const next = s[s.length - 1];
      setUndoStack(r => [...r, objectsRef.current]);
      setObjects(next);
      setSelectedIds([]);
      return s.slice(0, -1);
    });
  }, []);

  const deleteSelected = useCallback(() => {
    if (selectedIdsRef.current.length === 0) return;
    const ids = new Set(selectedIdsRef.current);
    commitObjects(objectsRef.current.filter(o => !ids.has(o.id)), true);
  }, [commitObjects]);

  const clearAll = useCallback(() => {
    if (objectsRef.current.length === 0) return;
    commitObjects([], true);
  }, [commitObjects]);

  const updateObject = useCallback((id: string, patch: Record<string, unknown>) => {
    const next = objectsRef.current.map(o =>
      o.id === id ? { ...o, ...patch } as DrawingObject : o
    );
    commitObjects(next);
  }, [commitObjects]);

  // ── Option setters ────────────────────────────────────────────────────────
  const _setOpt = useCallback(<K extends keyof DrawingOptions>(k: K, v: DrawingOptions[K]) => {
    optionsRef.current = { ...optionsRef.current, [k]: v };
    setOptions(prev => ({ ...prev, [k]: v }));
  }, []);

  const setTool        = useCallback((t: DrawingTool) => _setOpt('tool', t), [_setOpt]);
  const setColor       = useCallback((c: string)      => _setOpt('color', c), [_setOpt]);
  const setSize        = useCallback((s: number)      => _setOpt('size', s), [_setOpt]);
  const setShape       = useCallback((s: DrawingOptions['shape'])     => _setOpt('shape', s), [_setOpt]);
  const setShapeStyle  = useCallback((s: DrawingOptions['shapeStyle'])=> _setOpt('shapeStyle', s), [_setOpt]);
  const setFontSize    = useCallback((s: number) => _setOpt('fontSize', s), [_setOpt]);
  const toggleFontBold   = useCallback(() => _setOpt('fontBold',   !optionsRef.current.fontBold),   [_setOpt]);
  const toggleFontItalic = useCallback(() => _setOpt('fontItalic', !optionsRef.current.fontItalic), [_setOpt]);

  const selectMainTool = useCallback((main: 'cursor' | 'pen' | 'shape' | 'text') => {
    if (main === 'cursor') {
      _setOpt('tool', 'cursor'); setIsActive(false);
    } else if (main === 'pen') {
      const cur = optionsRef.current.tool;
      const t: DrawingTool = (['pen','highlighter','eraser'] as DrawingTool[]).includes(cur) ? cur : 'pen';
      _setOpt('tool', t); setIsActive(true);
    } else {
      _setOpt('tool', main as DrawingTool); setIsActive(true);
    }
  }, [_setOpt]);

  const deselect = useCallback(() => setSelectedIds([]), []);

  const cursorStyle = useMemo(() => {
    if (options.tool === 'cursor') return selectedIds.length > 0 ? 'grab' : 'default';
    if (!isActive) return 'default';
    switch (options.tool) {
      case 'eraser': return 'cell';
      case 'text':   return 'crosshair';
      default:       return 'crosshair';
    }
  }, [isActive, options.tool, selectedIds.length]);

  return {
    objects, selectedIds, options, isActive, textInput, cursorStyle,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    hasObjects: objects.length > 0,
    onPointerDown, onPointerMove, onPointerUp,
    onCursorDown, onCursorMove, onCursorUp, onCursorDoubleClick,
    confirmText, cancelText, editTextObject, updateObject,
    undo, redo, deleteSelected, clearAll,
    setTool, setColor, setSize, setShape, setShapeStyle,
    setFontSize, toggleFontBold, toggleFontItalic,
    selectMainTool, deselect,
  };
}
