'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

function formatDuration(s: number): string {
  const h   = Math.floor(s / 3600);
  const m   = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function useRecorder(compositorCanvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const recorderRef  = useRef<MediaRecorder | null>(null);
  const chunksRef    = useRef<Blob[]>([]);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobUrlRef   = useRef<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [duration,    setDuration]    = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const start = useCallback(() => {
    const canvas = compositorCanvasRef.current;
    if (!canvas || isRecording) return;

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
      setDownloadUrl(null);
    }

    const stream   = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 3_000_000, // 3 Mbps — denge: kalite vs boyut
    });

    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      const url  = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      setDownloadUrl(url);
    };

    recorder.start(1000); // 1 saniyelik chunk'lar
    recorderRef.current = recorder;
    setIsRecording(true);
    setDuration(0);
    timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
  }, [compositorCanvasRef, isRecording]);

  const stop = useCallback(() => {
    recorderRef.current?.stop();
    recorderRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const download = useCallback(() => {
    if (!downloadUrl) return;
    const a      = document.createElement('a');
    a.href       = downloadUrl;
    a.download   = `ders-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-')}.webm`;
    a.click();
  }, [downloadUrl]);

  useEffect(() => () => {
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    if (timerRef.current)   clearInterval(timerRef.current);
  }, []);

  return {
    isRecording,
    duration,
    durationText: formatDuration(duration),
    downloadUrl,
    start,
    stop,
    download,
  };
}
