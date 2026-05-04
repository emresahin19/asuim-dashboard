'use client';
import React, { useRef, useEffect, useState } from 'react';
import { CAMERA_W, CAMERA_H } from '../constants';
import type { CameraBackground } from '../types';
import styles from '../studio.module.scss';

const ICON_SETTINGS = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const ICON_CAM_OFF = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>
    <path d="m22 8-6 4 6 4V8z"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const ICON_CAM_ON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const ICON_CHEVRON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ICON_BG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);

const ICON_MIRROR = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 7l4 4-4 4M21 7l-4 4 4 4"/>
  </svg>
);

const ICON_IMAGE = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
  </svg>
);

const CAM_BG_PRESETS = [
  { label: 'Yeşil',     value: '#00b140' },
  { label: 'Mavi',      value: '#0047ab' },
  { label: 'Kırmızı',   value: '#c0392b' },
  { label: 'Siyah',     value: '#0a0a0a' },
  { label: 'Beyaz',     value: '#f8f8f8' },
  { label: 'Gri',       value: '#1e293b' },
];

interface CameraWidgetProps {
  cameraCanvasRef:     React.RefObject<HTMLCanvasElement | null>;
  isActive:            boolean;
  bgRemoval:           boolean;
  isMirrored:          boolean;
  cameraBg:            CameraBackground | null;
  onStart:             () => Promise<void>;
  onStop:              () => void;
  onToggleBg:          () => Promise<void>;
  onToggleMirror:      () => void;
  onSetCameraBg:       (bg: CameraBackground | null) => void;
}

export function CameraWidget({
  cameraCanvasRef, isActive, bgRemoval, isMirrored, cameraBg,
  onStart, onStop, onToggleBg, onToggleMirror, onSetCameraBg,
}: CameraWidgetProps) {
  const displayRef           = useRef<HTMLCanvasElement>(null);
  const bgImageInputRef      = useRef<HTMLInputElement>(null);
  const rafRef               = useRef<number>(0);
  const [bgLoading,      setBgLoading]      = useState(false);
  const [settingsOpen,   setSettingsOpen]   = useState(false);
  const [bgSectionOpen,  setBgSectionOpen]  = useState(false);
  const [camBgSectionOpen, setCamBgSectionOpen] = useState(false);
  const [mirSectionOpen, setMirSectionOpen] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const display = displayRef.current;
    if (!display) return;
    const ctx = display.getContext('2d')!;
    const copy = () => {
      const src = cameraCanvasRef.current;
      if (src) ctx.drawImage(src, 0, 0, display.width, display.height);
      rafRef.current = requestAnimationFrame(copy);
    };
    rafRef.current = requestAnimationFrame(copy);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, cameraCanvasRef]);

  const handleToggleBg = async () => {
    setBgLoading(true);
    await onToggleBg();
    setBgLoading(false);
  };

  const toggleSettings = () => {
    const next = !settingsOpen;
    setSettingsOpen(next);
    if (!next) { setBgSectionOpen(false); setCamBgSectionOpen(false); setMirSectionOpen(false); }
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => onSetCameraBg({ type: 'image', value: '', imageEl: img, src });
    img.src = src;
    e.target.value = '';
  };

  return (
    <div className={styles.cameraWidget}>
      <div className={styles.cameraHeader}>
        <span className={styles.cameraTitle}>Kamera</span>
      </div>

      {/* önizleme */}
      <div className={`${styles.cameraPreview} ${!isActive ? styles.cameraPreviewOff : ''}`}>
        {isActive ? (
          <canvas
            ref={displayRef}
            width={CAMERA_W / 4}
            height={CAMERA_H / 4}
            className={styles.cameraCanvas}
          />
        ) : (
          <div className={styles.cameraOffMsg}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2"/>
              <path d="m22 8-6 4 6 4V8z"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
            <span>Kamera kapalı</span>
          </div>
        )}
      </div>

      {/* icon row */}
      <div className={styles.camIconRow}>
        {isActive ? (
          <>
            <button
              className={`${styles.camIconBtn} ${settingsOpen ? styles.camIconBtnActive : ''}`}
              onClick={toggleSettings}
              title="Kamera ayarları"
            >
              {ICON_SETTINGS}
            </button>
            <button
              className={`${styles.camIconBtn} ${styles.camIconBtnDanger}`}
              onClick={onStop}
              title="Kamerayı kapat"
            >
              {ICON_CAM_OFF}
            </button>
          </>
        ) : (
          <button className={styles.camStartBtn} onClick={onStart} title="Kamerayı aç">
            {ICON_CAM_ON}
            <span>Kamerayı Aç</span>
          </button>
        )}
      </div>

      {/* settings panel */}
      {isActive && settingsOpen && (
        <div className={styles.camSettingsPanel}>
          {/* BG Kaldır accordion */}
          <div className={styles.accordionItem}>
            <div
              className={`${styles.accordionHeader} ${bgSectionOpen ? styles.accordionHeaderOpen : ''}`}
              onClick={() => setBgSectionOpen(v => !v)}
            >
              <span className={styles.accordionHeaderLabel}>
                {ICON_BG}
                BG Kaldır
                {bgRemoval && <span className={styles.accordionBadge} />}
              </span>
              <span className={`${styles.accordionChevron} ${bgSectionOpen ? styles.accordionChevronOpen : ''}`}>
                {ICON_CHEVRON}
              </span>
            </div>
            {bgSectionOpen && (
              <div className={styles.accordionContent}>
                <button
                  className={`${styles.camControlBtn} ${bgRemoval ? styles.camControlBtnActive : ''}`}
                  onClick={handleToggleBg}
                  disabled={bgLoading}
                >
                  {bgLoading ? <span className={styles.spinner} /> : ICON_BG}
                  <span>{bgRemoval ? 'Aktif — Kapat' : 'Arka Planı Kaldır'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Kamera Arka Planı accordion — yalnızca bgRemoval aktifken */}
          {bgRemoval && (
            <div className={styles.accordionItem}>
              <div
                className={`${styles.accordionHeader} ${camBgSectionOpen ? styles.accordionHeaderOpen : ''}`}
                onClick={() => setCamBgSectionOpen(v => !v)}
              >
                <span className={styles.accordionHeaderLabel}>
                  {ICON_IMAGE}
                  Kamera Arka Planı
                  {cameraBg && <span className={styles.accordionBadge} />}
                </span>
                <span className={`${styles.accordionChevron} ${camBgSectionOpen ? styles.accordionChevronOpen : ''}`}>
                  {ICON_CHEVRON}
                </span>
              </div>
              {camBgSectionOpen && (
                <div className={styles.accordionContent}>
                  {/* Renk önayarları */}
                  <div className={styles.camBgPresets}>
                    {CAM_BG_PRESETS.map(p => (
                      <button
                        key={p.value}
                        className={`${styles.camBgSwatch} ${cameraBg?.type === 'color' && cameraBg.value === p.value ? styles.camBgSwatchActive : ''}`}
                        style={{ background: p.value }}
                        title={p.label}
                        onClick={() => onSetCameraBg({ type: 'color', value: p.value })}
                      />
                    ))}
                  </div>

                  {/* Görsel yükle */}
                  <input
                    ref={bgImageInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleBgImageUpload}
                  />
                  <button
                    className={`${styles.camControlBtn} ${cameraBg?.type === 'image' ? styles.camControlBtnActive : ''}`}
                    onClick={() => bgImageInputRef.current?.click()}
                  >
                    {ICON_IMAGE}
                    <span>{cameraBg?.type === 'image' ? 'Görsel Seçili' : 'Görsel Yükle'}</span>
                  </button>

                  {/* Arka planı kaldır */}
                  {cameraBg && (
                    <button
                      className={styles.camControlBtn}
                      onClick={() => onSetCameraBg(null)}
                      style={{ marginTop: 4 }}
                    >
                      <span>✕ Arka Planı Kaldır</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Ayna accordion */}
          <div className={styles.accordionItem}>
            <div
              className={`${styles.accordionHeader} ${mirSectionOpen ? styles.accordionHeaderOpen : ''}`}
              onClick={() => setMirSectionOpen(v => !v)}
            >
              <span className={styles.accordionHeaderLabel}>
                {ICON_MIRROR}
                Ayna
                {isMirrored && <span className={styles.accordionBadge} />}
              </span>
              <span className={`${styles.accordionChevron} ${mirSectionOpen ? styles.accordionChevronOpen : ''}`}>
                {ICON_CHEVRON}
              </span>
            </div>
            {mirSectionOpen && (
              <div className={styles.accordionContent}>
                <button
                  className={`${styles.camControlBtn} ${isMirrored ? styles.camControlBtnActive : ''}`}
                  onClick={onToggleMirror}
                >
                  {ICON_MIRROR}
                  <span>{isMirrored ? 'Aktif — Kapat' : 'Ayna Görüntü'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
