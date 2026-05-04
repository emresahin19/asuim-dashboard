'use client';
import React, { useRef, useState, useCallback } from 'react';
import type { DrawingTool, DrawingOptions, ShapeType } from '../types';
import { DRAWING_COLORS, DRAWING_SIZES, FONT_SIZES } from '../hooks/useDrawing';
import styles from '../studio.module.scss';

interface ToolbarProps {
  tool:               DrawingTool;
  options:            DrawingOptions;
  canUndo:            boolean;
  canRedo:            boolean;
  hasObjects:         boolean;
  hasSelection:       boolean;
  zoom:               number;
  onSelectMainTool:   (t: 'cursor' | 'pen' | 'shape' | 'text') => void;
  onSetTool:          (t: DrawingTool) => void;
  onSetColor:         (c: string) => void;
  onSetSize:          (s: number) => void;
  onSetShape:         (s: ShapeType) => void;
  onSetShapeStyle:    (s: 'outline' | 'filled') => void;
  onSetFontSize:      (s: number) => void;
  onToggleFontBold:   () => void;
  onToggleFontItalic: () => void;
  onUndo:             () => void;
  onRedo:             () => void;
  onDeleteSelected:   () => void;
  onClearAll:         () => void;
  onResetView:        () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CURSOR_ICON = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>;
const PEN_ICON    = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
const SHAPE_ICON  = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><circle cx="17.5" cy="6.5" r="3.5"/><path d="M3 20l4-8 4 8"/><line x1="14" y1="17" x2="21" y2="17"/></svg>;
const TEXT_ICON   = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;

const HIGHLIGHT_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l-4 4 2.5 2.5L11 13"/><path d="M3 21h18"/><path d="m15 5-8 8 4 4 8-8-4-4z"/></svg>;
const ERASER_ICON    = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H7L3 16l10-10 7 7-3.5 3.5"/><path d="M6.5 17.5l4-4"/></svg>;

const UNDO_ICON   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M3 13A9 9 0 1 0 5.7 5.7L3 7"/></svg>;
const REDO_ICON   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M21 13A9 9 0 1 1 18.3 5.7L21 7"/></svg>;
const DELETE_ICON = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const CLEAR_ICON  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>;
const RESET_ICON  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3v6h-6"/><path d="M3 12a9 9 0 0115-6.7L21 9"/><path d="M3 21v-6h6"/><path d="M21 12a9 9 0 01-15 6.7L3 15"/></svg>;

const RECT_ICON   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="1"/></svg>;
const CIRCLE_ICON = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg>;
const LINE_ICON   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="20" x2="20" y2="4" strokeLinecap="round"/></svg>;
const ARROW_ICON  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5"/><polyline points="9 5 19 5 19 15"/></svg>;

function Divider() { return <div className={styles.tbPanelDivider} />; }

function ColorPalette({ color, onChange }: { color: string; onChange: (c: string) => void }) {
  return (
    <div className={styles.tbColorPalette}>
      {DRAWING_COLORS.map(c => (
        <button key={c} className={`${styles.tbColorBtn} ${color === c ? styles.tbColorBtnActive : ''}`}
          style={{ background: c }} onClick={() => onChange(c)} title={c} />
      ))}
    </div>
  );
}

function SizePicker({ size, onChange }: { size: number; onChange: (s: number) => void }) {
  return (
    <div className={styles.tbSizeRow}>
      {DRAWING_SIZES.map(s => (
        <button key={s} className={`${styles.tbSizeBtn} ${size === s ? styles.tbSizeBtnActive : ''}`}
          onClick={() => onChange(s)} title={`${s}px`}>
          <span style={{ width: Math.max(4, s * 1.5), height: Math.max(4, s * 1.5), borderRadius: '50%', background: 'currentColor', display: 'block' }} />
        </button>
      ))}
    </div>
  );
}

// ─── HoverToolContainer — button + floating panel with hover-bridge ───────────
function HoverToolContainer({
  children, panel,
}: { children: React.ReactNode; panel: React.ReactNode }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(false), 180);
  }, []);

  const cancelHide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className={styles.tbToolContainer}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {open && (
        <div
          className={styles.tbFloatPanel}
          onMouseEnter={cancelHide}
          onMouseLeave={hide}
        >
          {panel}
        </div>
      )}
    </div>
  );
}

// ─── Main toolbar ─────────────────────────────────────────────────────────────
export function Toolbar({
  tool, options, canUndo, canRedo, hasObjects, hasSelection, zoom,
  onSelectMainTool, onSetTool, onSetColor, onSetSize,
  onSetShape, onSetShapeStyle, onSetFontSize, onToggleFontBold, onToggleFontItalic,
  onUndo, onRedo, onDeleteSelected, onClearAll, onResetView,
}: ToolbarProps) {

  const isPenActive   = tool === 'pen' || tool === 'highlighter' || tool === 'eraser';
  const isShapeActive = tool === 'shape';
  const isTextActive  = tool === 'text';

  const penPanel = (
    <>
      <div className={styles.tbRow}>
        <button className={`${styles.tbIconBtn} ${tool === 'pen'         ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('pen'); onSetTool('pen'); }}         title="Kalem">{PEN_ICON}</button>
        <button className={`${styles.tbIconBtn} ${tool === 'highlighter' ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('pen'); onSetTool('highlighter'); }} title="İşaret kalemi">{HIGHLIGHT_ICON}</button>
        <button className={`${styles.tbIconBtn} ${tool === 'eraser'      ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('pen'); onSetTool('eraser'); }}      title="Silgi">{ERASER_ICON}</button>
      </div>
      {tool !== 'eraser' && <><Divider /><ColorPalette color={options.color} onChange={c => { onSelectMainTool('pen'); onSetColor(c); }} /></>}
      <Divider />
      <SizePicker size={options.size} onChange={s => { onSelectMainTool('pen'); onSetSize(s); }} />
    </>
  );

  const shapePanel = (
    <>
      <div className={styles.tbRow}>
        <button className={`${styles.tbIconBtn} ${options.shape === 'rect'   ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShape('rect');   }} title="Dikdörtgen">{RECT_ICON}</button>
        <button className={`${styles.tbIconBtn} ${options.shape === 'circle' ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShape('circle'); }} title="Çember">{CIRCLE_ICON}</button>
        <button className={`${styles.tbIconBtn} ${options.shape === 'line'   ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShape('line');   }} title="Çizgi">{LINE_ICON}</button>
        <button className={`${styles.tbIconBtn} ${options.shape === 'arrow'  ? styles.tbIconBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShape('arrow');  }} title="Ok">{ARROW_ICON}</button>
      </div>
      <Divider />
      <div className={styles.tbRow}>
        <button className={`${styles.tbLabelBtn} ${options.shapeStyle === 'outline' ? styles.tbLabelBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShapeStyle('outline'); }}>Dış hat</button>
        <button className={`${styles.tbLabelBtn} ${options.shapeStyle === 'filled'  ? styles.tbLabelBtnActive : ''}`} onClick={() => { onSelectMainTool('shape'); onSetShapeStyle('filled');  }}>Dolu</button>
      </div>
      <Divider />
      <ColorPalette color={options.color} onChange={c => { onSelectMainTool('shape'); onSetColor(c); }} />
      <Divider />
      <SizePicker size={options.size} onChange={s => { onSelectMainTool('shape'); onSetSize(s); }} />
    </>
  );

  const textPanel = (
    <>
      <div className={styles.tbRow}>
        {FONT_SIZES.map(s => (
          <button key={s} className={`${styles.tbLabelBtn} ${options.fontSize === s ? styles.tbLabelBtnActive : ''}`}
            onClick={() => { onSelectMainTool('text'); onSetFontSize(s); }}>{s}</button>
        ))}
      </div>
      <Divider />
      <div className={styles.tbRow}>
        <button className={`${styles.tbLabelBtn} ${options.fontBold   ? styles.tbLabelBtnActive : ''}`} onClick={() => { onSelectMainTool('text'); onToggleFontBold();   }} style={{ fontWeight: 700 }}>B</button>
        <button className={`${styles.tbLabelBtn} ${options.fontItalic ? styles.tbLabelBtnActive : ''}`} onClick={() => { onSelectMainTool('text'); onToggleFontItalic(); }} style={{ fontStyle: 'italic' }}>I</button>
      </div>
      <Divider />
      <ColorPalette color={options.color} onChange={c => { onSelectMainTool('text'); onSetColor(c); }} />
    </>
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.tbMainTools}>
        {/* Cursor — no hover panel */}
        <button
          className={`${styles.tbMainBtn} ${tool === 'cursor' ? styles.tbMainBtnActive : ''}`}
          onClick={() => onSelectMainTool('cursor')} title="Seç / Taşı"
        >
          {CURSOR_ICON}
          <span className={styles.tbMainLabel}>Seç</span>
        </button>

        <HoverToolContainer panel={penPanel}>
          <button
            className={`${styles.tbMainBtn} ${isPenActive ? styles.tbMainBtnActive : ''}`}
            onClick={() => onSelectMainTool('pen')} title="Kalem"
          >
            {PEN_ICON}
            <span className={styles.tbMainLabel}>Kalem</span>
          </button>
        </HoverToolContainer>

        <HoverToolContainer panel={shapePanel}>
          <button
            className={`${styles.tbMainBtn} ${isShapeActive ? styles.tbMainBtnActive : ''}`}
            onClick={() => onSelectMainTool('shape')} title="Şekil"
          >
            {SHAPE_ICON}
            <span className={styles.tbMainLabel}>Şekil</span>
          </button>
        </HoverToolContainer>

        <HoverToolContainer panel={textPanel}>
          <button
            className={`${styles.tbMainBtn} ${isTextActive ? styles.tbMainBtnActive : ''}`}
            onClick={() => onSelectMainTool('text')} title="Yazı"
          >
            {TEXT_ICON}
            <span className={styles.tbMainLabel}>Yazı</span>
          </button>
        </HoverToolContainer>
      </div>

      <div style={{ flex: 1 }} />

      {zoom !== 1 && (
        <button className={styles.tbResetBtn} onClick={onResetView} title="Görünümü sıfırla">
          {RESET_ICON}<span>{Math.round(zoom * 100)}%</span>
        </button>
      )}

      <div className={styles.tbBottomActions}>
        <button className={styles.tbBottomBtn} onClick={onUndo} disabled={!canUndo} title="Geri al (Ctrl+Z)">{UNDO_ICON}</button>
        <button className={styles.tbBottomBtn} onClick={onRedo} disabled={!canRedo} title="İleri al">{REDO_ICON}</button>
        <button className={`${styles.tbBottomBtn} ${styles.tbBottomBtnDanger}`}
          onClick={onDeleteSelected} disabled={!hasSelection} title="Seçiliyi sil (Del)">{DELETE_ICON}</button>
        <button className={`${styles.tbBottomBtn} ${styles.tbBottomBtnDanger}`}
          onClick={onClearAll} disabled={!hasObjects} title="Tümünü temizle">{CLEAR_ICON}</button>
      </div>
    </div>
  );
}
