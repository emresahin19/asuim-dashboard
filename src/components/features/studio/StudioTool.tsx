'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { COMPOSITOR_W, COMPOSITOR_H } from './constants';
import { useScreenShare } from './hooks/useScreenShare';
import { useCamera }      from './hooks/useCamera';
import { useDrawing }     from './hooks/useDrawing';
import { useCompositor }  from './hooks/useCompositor';
import { useRecorder }    from './hooks/useRecorder';
import { useWhiteboard }  from './hooks/useWhiteboard';
import { useImages }      from './hooks/useImages';
import { Toolbar }           from './components/Toolbar';
import { CameraWidget }      from './components/CameraWidget';
import { CameraOverlay }     from './components/CameraOverlay';
import { ImageOverlay }      from './components/ImageOverlay';
import { ObjectEditPanel }   from './components/ObjectEditPanel';
import { RecordingControls } from './components/RecordingControls';
import type { DrawingObject } from './types';
import styles from './studio.module.scss';

const SCREEN_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const IMAGE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const PLUS_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const TRASH_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

// ─── Text input overlay (textarea-based for area support) ─────────────────────
function TextInputOverlay({
  canvasX, canvasY, w, h, fontSize, fontBold, fontItalic, color, editId, existingText,
  canvasScale, onConfirm, onCancel,
}: {
  canvasX: number; canvasY: number;
  w?: number; h?: number;
  fontSize: number; fontBold: boolean; fontItalic: boolean; color: string;
  editId?: string;
  existingText?: string;
  canvasScale: number;
  onConfirm: (t: string) => void;
  onCancel:  () => void;
}) {
  const [value, setValue] = useState(existingText ?? '');
  const ref = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  const handleConfirm = useCallback((t: string) => {
    if (doneRef.current) return;
    doneRef.current = true;
    onConfirm(t);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCancel();
  }, [onCancel]);

  const leftPct   = `${(canvasX / COMPOSITOR_W) * 100}%`;
  const topPct    = `${(canvasY / COMPOSITOR_H) * 100}%`;
  const widthPct  = w  ? `${(w  / COMPOSITOR_W) * 100}%` : undefined;
  const heightPct = h  ? `${(h  / COMPOSITOR_H) * 100}%` : undefined;
  const fontSizePx = `${Math.round(fontSize * canvasScale)}px`;

  return (
    <textarea
      ref={ref}
      className={styles.textInputOverlay}
      style={{
        left:       leftPct,
        top:        topPct,
        width:      widthPct  ?? 'auto',
        height:     heightPct ?? 'auto',
        minWidth:   widthPct  ? undefined : `${Math.round(120 * canvasScale)}px`,
        minHeight:  heightPct ? undefined : '2em',
        fontSize:   fontSizePx,
        fontWeight: fontBold   ? 700 : 400,
        fontStyle:  fontItalic ? 'italic' : 'normal',
        color,
        resize:     'none',
      }}
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handleConfirm(value); }
        if (e.key === 'Escape') { e.preventDefault(); handleCancel(); }
      }}
      onBlur={() => value.trim() ? handleConfirm(value) : handleCancel()}
      placeholder={editId ? 'Düzenle…' : 'Yazı gir… (Ctrl+Enter onaylar)'}
    />
  );
}

// ─── Image sidebar section ────────────────────────────────────────────────────
function ImageSidebarSection({
  images, onAdd, onRemove,
}: {
  images: { id: string; src: string }[];
  onAdd: (file: File) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).filter(f => f.type.startsWith('image/')).forEach(onAdd);
  }, [onAdd]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className={styles.imageSidebarSection}>
      <div className={styles.imageSidebarHeader}>
        <span className={styles.imageSidebarTitle}>{IMAGE_ICON} Görseller</span>
        <button className={styles.imageSidebarAddBtn} onClick={() => inputRef.current?.click()} title="Görsel ekle">
          {PLUS_ICON}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
      />

      <div
        className={`${styles.imageDropZone} ${dragging ? styles.imageDropZoneActive : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        {dragging ? 'Bırak!' : 'Sürükle veya tıkla'}
      </div>

      {images.length > 0 && (
        <div className={styles.imageThumbnailList}>
          {images.map((img, i) => (
            <div key={img.id} className={styles.imageThumbnailRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={`Görsel ${i + 1}`} className={styles.imageThumbnail} />
              <button
                className={styles.imageThumbnailDelete}
                onClick={() => onRemove(img.id)}
                title="Kaldır"
              >
                {TRASH_ICON}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── StudioTool ───────────────────────────────────────────────────────────────
export function StudioTool() {
  const compositorCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef    = useRef<HTMLCanvasElement>(null);
  const stageWrapRef        = useRef<HTMLDivElement>(null);

  const screenShare   = useScreenShare();
  const camera        = useCamera();
  const drawing       = useDrawing(drawingCanvasRef);
  const recorder      = useRecorder(compositorCanvasRef);
  const whiteboard    = useWhiteboard(stageWrapRef);
  const overlayImages = useImages();

  const isScreenActiveRef = useRef(false);
  const isCameraActiveRef = useRef(false);

  useEffect(() => { isScreenActiveRef.current = screenShare.isActive; }, [screenShare.isActive]);
  useEffect(() => { isCameraActiveRef.current = camera.isActive;      }, [camera.isActive]);

  useEffect(() => {
    const canvas = drawingCanvasRef.current;
    if (!canvas) return;
    canvas.width  = COMPOSITOR_W;
    canvas.height = COMPOSITOR_H;
  }, []);

  useCompositor({
    compositorCanvasRef,
    drawingCanvasRef,
    screenVideoElRef:  screenShare.videoElRef,
    cameraCanvasElRef: camera.cameraCanvasRef,
    isScreenActiveRef,
    isCameraActiveRef,
    cameraPositionRef: camera.positionRef,
    imagesRef:         overlayImages.imagesRef,
  });

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;

      const ctrl  = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (ctrl && !shift && e.key === 'z') { e.preventDefault(); drawing.undo(); return; }
      if (ctrl && shift  && (e.key === 'z' || e.key === 'Z')) { e.preventDefault(); drawing.redo(); return; }
      if (ctrl && !shift && e.key === 'y') { e.preventDefault(); drawing.redo(); return; }
      if (ctrl && shift  && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); drawing.clearAll(); return; }
      if (ctrl && !shift && e.key === 'x') { e.preventDefault(); drawing.deleteSelected(); return; }
      if (e.key === 'Delete' || e.key === 'Backspace') { drawing.deleteSelected(); return; }
      if (e.key === 'Escape') { drawing.deselect(); return; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawing]);

  const isCursorTool = drawing.options.tool === 'cursor';
  const canvasPointerEvents = isCursorTool || drawing.isActive;

  const handlePointerDown = isCursorTool ? drawing.onCursorDown : drawing.onPointerDown;
  const handlePointerMove = isCursorTool ? drawing.onCursorMove : drawing.onPointerMove;
  const handlePointerUp   = isCursorTool ? drawing.onCursorUp   : drawing.onPointerUp;

  // ── ObjectEditPanel: show only when one object selected & in cursor mode ────
  const singleSelectedObj: DrawingObject | undefined =
    isCursorTool && drawing.selectedIds.length === 1
      ? drawing.objects.find(o => o.id === drawing.selectedIds[0])
      : undefined;

  return (
    <div className={styles.studio}>
      {/* ÜST BAR */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            Studio
          </span>
        </div>
        <div className={styles.headerCenter}>
          <RecordingControls
            isRecording={recorder.isRecording}
            durationText={recorder.durationText}
            downloadUrl={recorder.downloadUrl}
            onStart={recorder.start}
            onStop={recorder.stop}
            onDownload={recorder.download}
          />
        </div>
        <div className={styles.headerRight}>
          <button
            className={`${styles.sourceBtn} ${screenShare.isActive ? styles.sourceBtnActive : ''}`}
            onClick={screenShare.isActive ? screenShare.stop : screenShare.start}
            title={screenShare.isActive ? 'Ekran paylaşımını durdur' : 'Ekran paylaş'}
          >
            {SCREEN_ICON}
            <span>{screenShare.isActive ? 'Ekranı Durdur' : 'Ekran Paylaş'}</span>
          </button>
        </div>
      </header>

      {/* ANA ALAN */}
      <div className={styles.body}>
        {/* SOL: TOOLBAR */}
        <aside className={styles.sidebar}>
          <Toolbar
            tool={drawing.options.tool}
            options={drawing.options}
            canUndo={drawing.canUndo}
            canRedo={drawing.canRedo}
            hasObjects={drawing.hasObjects}
            hasSelection={drawing.selectedIds.length > 0}
            zoom={whiteboard.zoom}
            onSelectMainTool={drawing.selectMainTool}
            onSetTool={drawing.setTool}
            onSetColor={drawing.setColor}
            onSetSize={drawing.setSize}
            onSetShape={drawing.setShape}
            onSetShapeStyle={drawing.setShapeStyle}
            onSetFontSize={drawing.setFontSize}
            onToggleFontBold={drawing.toggleFontBold}
            onToggleFontItalic={drawing.toggleFontItalic}
            onUndo={drawing.undo}
            onRedo={drawing.redo}
            onDeleteSelected={drawing.deleteSelected}
            onClearAll={drawing.clearAll}
            onResetView={whiteboard.resetView}
          />
        </aside>

        {/* MERKEZ: SAHNE */}
        <main className={styles.stage}>
          <div
            className={styles.stageViewport}
            onContextMenu={whiteboard.onContextMenu}
            onMouseDown={whiteboard.onMouseDown}
            onMouseMove={whiteboard.onMouseMove}
            onMouseUp={whiteboard.onMouseUp}
            onMouseLeave={whiteboard.onMouseLeave}
          >
            <div
              ref={stageWrapRef}
              className={styles.stageWrap}
              style={{
                transformOrigin: '0 0',
                transform: `translate(${whiteboard.pan.x}px, ${whiteboard.pan.y}px) scale(${whiteboard.zoom})`,
              }}
            >
              <canvas ref={compositorCanvasRef} className={styles.compositorCanvas} aria-label="Studio sahne önizleme" />
              <canvas
                ref={drawingCanvasRef}
                className={styles.drawingCanvas}
                style={{
                  cursor:        drawing.cursorStyle,
                  pointerEvents: canvasPointerEvents ? 'auto' : 'none',
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onDoubleClick={isCursorTool ? drawing.onCursorDoubleClick : undefined}
              />
              {drawing.textInput && (
                <TextInputOverlay
                  canvasX={drawing.textInput.canvasX}
                  canvasY={drawing.textInput.canvasY}
                  w={drawing.textInput.w}
                  h={drawing.textInput.h}
                  editId={drawing.textInput.editId}
                  existingText={drawing.textInput.existingText}
                  fontSize={drawing.options.fontSize}
                  fontBold={drawing.options.fontBold}
                  fontItalic={drawing.options.fontItalic}
                  color={drawing.options.color}
                  canvasScale={stageWrapRef.current ? stageWrapRef.current.clientHeight / COMPOSITOR_H : 1}
                  onConfirm={drawing.confirmText}
                  onCancel={drawing.cancelText}
                />
              )}
              {singleSelectedObj && !drawing.textInput && (
                <ObjectEditPanel
                  object={singleSelectedObj}
                  onUpdate={drawing.updateObject}
                  onEditText={drawing.editTextObject}
                  onDelete={drawing.deleteSelected}
                />
              )}
              <ImageOverlay
                compositorCanvasRef={compositorCanvasRef}
                images={overlayImages.images}
                imagesRef={overlayImages.imagesRef}
                isCursorTool={isCursorTool}
                onRemove={overlayImages.removeImage}
              />
              <CameraOverlay
                compositorCanvasRef={compositorCanvasRef}
                isActive={camera.isActive}
                positionRef={camera.positionRef}
              />
            </div>
          </div>
        </main>

        {/* SAĞ: KAMERA + GÖRSELLER */}
        <aside className={styles.cameraSidebar}>
          <ImageSidebarSection
            images={overlayImages.images}
            onAdd={overlayImages.addImage}
            onRemove={overlayImages.removeImage}
          />
          <CameraWidget
            cameraCanvasRef={camera.cameraCanvasRef}
            isActive={camera.isActive}
            bgRemoval={camera.bgRemoval}
            isMirrored={camera.isMirrored}
            cameraBg={camera.cameraBg}
            onStart={camera.start}
            onStop={camera.stop}
            onToggleBg={camera.toggleBgRemoval}
            onToggleMirror={camera.toggleMirror}
            onSetCameraBg={camera.setCameraBackground}
          />
        </aside>
      </div>
    </div>
  );
}
