'use client';
import React from 'react';
import styles from '../studio.module.scss';

interface RecordingControlsProps {
  isRecording:  boolean;
  durationText: string;
  downloadUrl:  string | null;
  onStart:      () => void;
  onStop:       () => void;
  onDownload:   () => void;
}

const REC_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="8"/>
  </svg>
);
const STOP_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  </svg>
);
const DOWNLOAD_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export function RecordingControls({
  isRecording, durationText, downloadUrl, onStart, onStop, onDownload,
}: RecordingControlsProps) {
  return (
    <div className={styles.recControls}>
      {isRecording ? (
        <>
          <div className={styles.recIndicator}>
            <span className={styles.recDot} />
            <span className={styles.recLabel}>REC</span>
            <span className={styles.recTimer}>{durationText}</span>
          </div>
          <button className={styles.stopBtn} onClick={onStop}>
            {STOP_ICON}
            <span>Durdur</span>
          </button>
        </>
      ) : (
        <button className={styles.startBtn} onClick={onStart}>
          {REC_ICON}
          <span>Kayıt Başlat</span>
        </button>
      )}

      {downloadUrl && !isRecording && (
        <button className={styles.downloadBtn} onClick={onDownload}>
          {DOWNLOAD_ICON}
          <span>İndir</span>
        </button>
      )}
    </div>
  );
}
