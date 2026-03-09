"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Grid, GridItem, Input, Range, Select, SelectOption, SelectValue, Spinner } from '@/components';
import { SpinnerName, spinnerMap } from '@/components/ui/spinner/spinner.data';

import styles from './spinner.module.scss';

type SpinnerEntry = [SpinnerName, (typeof spinnerMap)[SpinnerName]];
type SpinnerFitInfo = {
  fits: boolean;
  maxFrameWidth: number;
  slotWidth: number;
};
type SpinnerColorKey = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';

const colorOptions: SelectOption[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Neutral', value: 'neutral' },
];

const spinnerEntries = Object.entries(spinnerMap) as SpinnerEntry[];

export default function SpinnerPage() {
  const [query, setQuery] = useState('');
  const [size, setSize] = useState(24);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [colorValue, setColorValue] = useState<SelectValue>(colorOptions[0]);
  const [fitMap, setFitMap] = useState<Partial<Record<SpinnerName, SpinnerFitInfo>>>({});

  const measureTextRef = useRef<HTMLSpanElement | null>(null);
  const previewProbeRef = useRef<HTMLSpanElement | null>(null);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return spinnerEntries;
    }

    return spinnerEntries.filter(([name]) => name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const nonFittingCount = useMemo(() => {
    return filteredEntries.reduce((count, [name]) => {
      return fitMap[name]?.fits === false ? count + 1 : count;
    }, 0);
  }, [filteredEntries, fitMap]);

  const selectedColor = useMemo<SpinnerColorKey>(() => {
    const value = !Array.isArray(colorValue) ? colorValue?.value : null;

    if (
      value === 'primary' ||
      value === 'success' ||
      value === 'info' ||
      value === 'warning' ||
      value === 'danger' ||
      value === 'neutral'
    ) {
      return value;
    }

    return 'primary';
  }, [colorValue]);

  const spinnerColor = useMemo(() => {
    return selectedColor === 'primary' ? 'var(--color-accent)' : `var(--color-${selectedColor})`;
  }, [selectedColor]);

  const measureFits = useCallback(() => {
    const measureElement = measureTextRef.current;
    const probeElement = previewProbeRef.current;

    if (!measureElement || !probeElement) {
      return;
    }

    const slotWidth = probeElement.getBoundingClientRect().width;

    if (slotWidth <= 0) {
      return;
    }

    const nextFitMap: Partial<Record<SpinnerName, SpinnerFitInfo>> = {};
    const largestPreviewSize = size + 8;

    measureElement.style.fontSize = `${largestPreviewSize}px`;

    for (const [name, spinner] of spinnerEntries) {
      let maxFrameWidth = 0;

      for (const frame of spinner.frames) {
        measureElement.textContent = frame;
        const frameWidth = measureElement.getBoundingClientRect().width;
        if (frameWidth > maxFrameWidth) {
          maxFrameWidth = frameWidth;
        }
      }

      nextFitMap[name] = {
        fits: maxFrameWidth <= slotWidth,
        maxFrameWidth,
        slotWidth,
      };
    }

    setFitMap(nextFitMap);
  }, [size]);

  useEffect(() => {
    measureFits();

    const probeElement = previewProbeRef.current;
    if (!probeElement) {
      return;
    }

    const observer = new ResizeObserver(() => {
      measureFits();
    });

    observer.observe(probeElement);

    return () => observer.disconnect();
  }, [measureFits]);

  return (
    <div className={styles.page}>
      <div className={styles.measureLayer} aria-hidden>
        <span ref={measureTextRef} className={styles.measureText} />
      </div>

      <Card className={styles.heroCard}>
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Spinner Gallery</h1>
        <p className={styles.subtitle}>
          ASCII tabanli tum spinner varyasyonlarini tek ekranda canli olarak gorebilir, filtreleyebilir
          ve hiz-boyut ayarlarini test edebilirsin.
        </p>
      </Card>

      <Grid withGap className={styles.controlGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.controlCard}>
            <Input
              label="Spinner Ara"
              placeholder="Orn: dots, arc, toggle"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              fullWidth
            />
            <p className={styles.meta}>{filteredEntries.length} spinner listeleniyor</p>
            <p className={styles.meta}>
              {nonFittingCount} spinner bu boyutta hucreye sigmadigi icin auto-fit ile gosteriliyor
            </p>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.controlCard}>
            <label className={styles.rangeWrap}>
              <span>Boyut: {size}px</span>
              <Range
                min={12}
                max={42}
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
              />
            </label>

            <label className={styles.rangeWrap}>
              <span>Hiz: x{speedMultiplier.toFixed(1)}</span>
              <Range
                min={0.5}
                max={2.4}
                step={0.1}
                value={speedMultiplier}
                onChange={(event) => setSpeedMultiplier(Number(event.target.value))}
              />
            </label>

            <div className={styles.selectWrap}>
              <Select
                label="Renk"
                options={colorOptions}
                value={colorValue}
                onChange={(value) => setColorValue(value)}
                isSearchable={false}
                isClearable={false}
                placeholder="Renk sec"
              />
            </div>
          </Card>
        </GridItem>
      </Grid>

      <div className={styles.galleryGrid}>
        {filteredEntries.map(([name, spinner], index) => {
          const fitInfo = fitMap[name];
          const scale = fitInfo && fitInfo.maxFrameWidth > 0
            ? Math.min(1, fitInfo.slotWidth / fitInfo.maxFrameWidth)
            : 1;

          const smallSize = Math.max(10, Math.floor(Math.max(12, size - 6) * scale));
          const mediumSize = Math.max(10, Math.floor(size * scale));
          const largeSize = Math.max(10, Math.floor((size + 8) * scale));

          return (
          <Card key={name} className={styles.spinnerCard}>
            <div className={styles.cardHead}>
              <p className={styles.spinnerName}>{name}</p>
              <p className={styles.spinnerMeta}>
                {spinner.frames.length} frame / {spinner.interval}ms
              </p>
            </div>

            <div className={styles.previewRow} data-overflow={fitInfo?.fits === false}>
              <span className={styles.previewCell} ref={index === 0 ? previewProbeRef : undefined}>
                <Spinner name={name} size={smallSize} color={spinnerColor} speedMultiplier={speedMultiplier} />
              </span>
              <span className={styles.previewCell}>
                <Spinner name={name} size={mediumSize} color={spinnerColor} speedMultiplier={speedMultiplier} />
              </span>
              <span className={styles.previewCell}>
                <Spinner
                  name={name}
                  size={largeSize}
                  color={spinnerColor}
                  speedMultiplier={Math.min(4, speedMultiplier * 1.6)}
                />
              </span>
            </div>

            {fitInfo?.fits === false ? <p className={styles.fitHint}>auto-fit aktif</p> : null}
            <p className={styles.framePreview}>{spinner.frames.slice(0, 8).join(' ')}</p>
          </Card>
          );
        })}
      </div>
    </div>
  );
}
