'use client';
import React from 'react';
import type { DrawingObject } from '../types';
import { DRAWING_COLORS, DRAWING_SIZES, FONT_SIZES } from '../hooks/useDrawing';
import { getObjectBounds } from '../utils/drawingRenderer';
import { COMPOSITOR_W, COMPOSITOR_H } from '../constants';
import styles from '../studio.module.scss';

interface Props {
  object:           DrawingObject;
  onUpdate:         (id: string, patch: Record<string, unknown>) => void;
  onEditText:       (id: string) => void;
  onDelete:         () => void;
}

function ColorDot({ color, active, onClick }: { color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`${styles.epColorBtn} ${active ? styles.epColorBtnActive : ''}`}
      style={{ background: color }}
      onClick={onClick}
      title={color}
    />
  );
}

export function ObjectEditPanel({ object, onUpdate, onEditText, onDelete }: Props) {
  const bounds = getObjectBounds(object);
  if (!bounds) return null;

  // Position panel below the object (or above if near bottom)
  const panelY = bounds.y + bounds.h + 8;
  const panelX = Math.max(0, Math.min(bounds.x, COMPOSITOR_W - 200));

  const leftPct   = (panelX / COMPOSITOR_W) * 100;
  const topPct    = (panelY / COMPOSITOR_H) * 100;

  const currentColor = 'color' in object ? (object as { color: string }).color : '#EF4444';

  const showSize     = object.type === 'stroke' || object.type === 'shape';
  const showShapeStyle = object.type === 'shape';
  const showFont     = object.type === 'text';
  const currentSize  = 'size' in object ? (object as { size: number }).size : 4;

  return (
    <div
      className={styles.objectEditPanel}
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
      onPointerDown={e => e.stopPropagation()}
    >
      {/* Color row */}
      <div className={styles.epRow}>
        {DRAWING_COLORS.map(c => (
          <ColorDot key={c} color={c} active={currentColor === c}
            onClick={() => onUpdate(object.id, { color: c })} />
        ))}
      </div>

      {showSize && (
        <div className={styles.epRow} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 4, marginTop: 2 }}>
          {DRAWING_SIZES.map(s => (
            <button
              key={s}
              className={`${styles.epSizeBtn} ${currentSize === s ? styles.epSizeBtnActive : ''}`}
              onClick={() => onUpdate(object.id, { size: s })}
              title={`${s}px`}
            >
              <span style={{ width: Math.max(3, s * 1.2), height: Math.max(3, s * 1.2), borderRadius: '50%', background: 'currentColor', display: 'block' }} />
            </button>
          ))}
        </div>
      )}

      {showShapeStyle && object.type === 'shape' && (
        <div className={styles.epRow} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 4, marginTop: 2 }}>
          <button
            className={`${styles.epLabelBtn} ${object.shapeStyle === 'outline' ? styles.epLabelBtnActive : ''}`}
            onClick={() => onUpdate(object.id, { shapeStyle: 'outline' })}
          >Dış hat</button>
          <button
            className={`${styles.epLabelBtn} ${object.shapeStyle === 'filled' ? styles.epLabelBtnActive : ''}`}
            onClick={() => onUpdate(object.id, { shapeStyle: 'filled' })}
          >Dolu</button>
        </div>
      )}

      {showFont && object.type === 'text' && (
        <div className={styles.epRow} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 4, marginTop: 2, flexWrap: 'wrap', gap: 3 }}>
          {FONT_SIZES.map(s => (
            <button key={s}
              className={`${styles.epLabelBtn} ${object.fontSize === s ? styles.epLabelBtnActive : ''}`}
              onClick={() => onUpdate(object.id, { fontSize: s })}
            >{s}</button>
          ))}
          <button
            className={`${styles.epLabelBtn} ${object.fontBold ? styles.epLabelBtnActive : ''}`}
            onClick={() => onUpdate(object.id, { fontBold: !object.fontBold })}
            style={{ fontWeight: 700 }}
          >B</button>
          <button
            className={`${styles.epLabelBtn} ${object.fontItalic ? styles.epLabelBtnActive : ''}`}
            onClick={() => onUpdate(object.id, { fontItalic: !object.fontItalic })}
            style={{ fontStyle: 'italic' }}
          >I</button>
          {/* <button
            className={styles.epLabelBtn}
            onClick={() => onEditText(object.id)}
            title="Metni düzenle"
          >✏️ Düzenle</button> */}
        </div>
      )}

      {/* Delete */}
      <button className={styles.epDeleteBtn} onClick={onDelete} title="Sil">✕</button>
    </div>
  );
}
