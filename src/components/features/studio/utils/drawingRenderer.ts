import type { DrawingObject, StrokeObject, ShapeObject, TextObject } from '../types';

// ── Render ────────────────────────────────────────────────────────────────────

export function renderAll(
  ctx: CanvasRenderingContext2D,
  objects: DrawingObject[],
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);
  for (const obj of objects) renderObject(ctx, obj);
}

export function renderObject(ctx: CanvasRenderingContext2D, obj: DrawingObject) {
  ctx.save();
  if (obj.type === 'stroke') renderStroke(ctx, obj);
  else if (obj.type === 'shape') renderShape(ctx, obj);
  else renderText(ctx, obj);
  ctx.restore();
}

function renderStroke(ctx: CanvasRenderingContext2D, obj: StrokeObject) {
  if (obj.points.length < 1) return;
  ctx.lineCap  = 'round';
  ctx.lineJoin = 'round';
  if (obj.tool === 'highlighter') {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = obj.color;
    ctx.lineWidth   = obj.size * 4;
    ctx.globalAlpha = 0.35;
  } else if (obj.tool === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth   = obj.size * 3;
    ctx.globalAlpha = 1;
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = obj.color;
    ctx.lineWidth   = obj.size;
    ctx.globalAlpha = 1;
  }
  ctx.beginPath();
  const pts = obj.points;
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  if (pts.length > 1) ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.stroke();
}

function renderShape(ctx: CanvasRenderingContext2D, obj: ShapeObject) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha  = 1;
  ctx.strokeStyle  = obj.color;
  ctx.fillStyle    = obj.color;
  ctx.lineWidth    = obj.size;
  ctx.lineCap      = 'round';
  ctx.lineJoin     = 'round';

  const x = Math.min(obj.x1, obj.x2);
  const y = Math.min(obj.y1, obj.y2);
  const w = Math.abs(obj.x2 - obj.x1);
  const h = Math.abs(obj.y2 - obj.y1);

  ctx.beginPath();
  if (obj.shape === 'rect') {
    if (obj.shapeStyle === 'filled') ctx.fillRect(x, y, w, h);
    else ctx.strokeRect(x, y, w, h);
  } else if (obj.shape === 'circle') {
    ctx.ellipse(x + w / 2, y + h / 2, Math.max(w / 2, 1), Math.max(h / 2, 1), 0, 0, Math.PI * 2);
    if (obj.shapeStyle === 'filled') ctx.fill(); else ctx.stroke();
  } else if (obj.shape === 'line') {
    ctx.moveTo(obj.x1, obj.y1); ctx.lineTo(obj.x2, obj.y2); ctx.stroke();
  } else if (obj.shape === 'arrow') {
    const dx    = obj.x2 - obj.x1;
    const dy    = obj.y2 - obj.y1;
    const angle = Math.atan2(dy, dx);
    const head  = Math.max(14, obj.size * 4);
    ctx.moveTo(obj.x1, obj.y1); ctx.lineTo(obj.x2, obj.y2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(obj.x2, obj.y2);
    ctx.lineTo(obj.x2 - head * Math.cos(angle - Math.PI / 6), obj.y2 - head * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(obj.x2, obj.y2);
    ctx.lineTo(obj.x2 - head * Math.cos(angle + Math.PI / 6), obj.y2 - head * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }
}

function renderText(ctx: CanvasRenderingContext2D, obj: TextObject) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.fillStyle   = obj.color;
  ctx.font = `${obj.fontItalic ? 'italic' : 'normal'} ${obj.fontBold ? 'bold' : 'normal'} ${obj.fontSize}px system-ui, sans-serif`;
  const lineHeight = obj.fontSize * 1.4;
  obj.text.split('\n').forEach((line, i) => {
    ctx.fillText(line, obj.x, obj.y + i * lineHeight);
  });
}

// ── Selection overlay ─────────────────────────────────────────────────────────

export function drawSelectionOverlay(
  ctx: CanvasRenderingContext2D,
  bounds: ReturnType<typeof getObjectBounds>,
) {
  if (!bounds) return;
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
  const corners = [
    [bounds.x, bounds.y],
    [bounds.x + bounds.w, bounds.y],
    [bounds.x, bounds.y + bounds.h],
    [bounds.x + bounds.w, bounds.y + bounds.h],
  ];
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#3B82F6';
  ctx.setLineDash([]);
  ctx.lineWidth = 1.5;
  for (const [hx, hy] of corners) {
    ctx.beginPath();
    ctx.arc(hx, hy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

// ── Bounds ────────────────────────────────────────────────────────────────────

export function getObjectBounds(obj: DrawingObject) {
  if (obj.type === 'stroke') {
    if (obj.points.length === 0) return null;
    let minX = obj.points[0].x, maxX = minX;
    let minY = obj.points[0].y, maxY = minY;
    for (const p of obj.points) {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    }
    const pad = obj.size * 2 + 4;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
  }
  if (obj.type === 'shape') {
    const x = Math.min(obj.x1, obj.x2), y = Math.min(obj.y1, obj.y2);
    const w = Math.abs(obj.x2 - obj.x1),  h = Math.abs(obj.y2 - obj.y1);
    const pad = obj.size + 6;
    return { x: x - pad, y: y - pad, w: w + pad * 2, h: h + pad * 2 };
  }
  if (obj.type === 'text') {
    const lines = obj.text.split('\n');
    const maxLen = Math.max(...lines.map(l => l.length), 1);
    const approxW = maxLen * obj.fontSize * 0.62;
    const lineHeight = obj.fontSize * 1.4;
    const totalH = (lines.length - 1) * lineHeight + obj.fontSize;
    return { x: obj.x - 4, y: obj.y - obj.fontSize - 4, w: approxW + 8, h: totalH + 12 };
  }
  return null;
}

// ── Hit test ──────────────────────────────────────────────────────────────────

export function hitTest(objects: DrawingObject[], x: number, y: number): string | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    const b = getObjectBounds(objects[i]);
    if (!b) continue;
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return objects[i].id;
  }
  return null;
}

export function hitTestInRect(
  objects: DrawingObject[],
  rx1: number, ry1: number, rx2: number, ry2: number,
): string[] {
  const minX = Math.min(rx1, rx2), maxX = Math.max(rx1, rx2);
  const minY = Math.min(ry1, ry2), maxY = Math.max(ry1, ry2);
  const ids: string[] = [];
  for (const obj of objects) {
    const b = getObjectBounds(obj);
    if (!b) continue;
    if (b.x < maxX && b.x + b.w > minX && b.y < maxY && b.y + b.h > minY) {
      ids.push(obj.id);
    }
  }
  return ids;
}

export function drawMarquee(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
) {
  ctx.save();
  const x = Math.min(x1, x2), y = Math.min(y1, y2);
  const w = Math.abs(x2 - x1),  h = Math.abs(y2 - y1);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.fillStyle   = 'rgba(59,130,246,0.07)';
  ctx.fillRect(x, y, w, h);
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

// ── Move helpers ──────────────────────────────────────────────────────────────

export function moveObject(obj: DrawingObject, dx: number, dy: number): DrawingObject {
  if (obj.type === 'stroke') return { ...obj, points: obj.points.map(p => ({ x: p.x + dx, y: p.y + dy })) };
  if (obj.type === 'shape')  return { ...obj, x1: obj.x1 + dx, y1: obj.y1 + dy, x2: obj.x2 + dx, y2: obj.y2 + dy };
  if (obj.type === 'text')   return { ...obj, x: obj.x + dx, y: obj.y + dy };
  return obj;
}
