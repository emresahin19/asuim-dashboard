"use client";

import { useDeferredValue, useMemo, useState } from 'react';
import { Card, Grid, GridItem } from '@/components';
import styles from './icons.module.scss';
import { ICON_NAMES } from '@/types/icon.types';
import dynamic from 'next/dynamic';

const IconsGallery = dynamic(() => import('./IconsGallery'), {
    ssr: false,
});

export default function IconsPage() {
    const [query, setQuery] = useState('');
    const [strokeWidth, setStrokeWidth] = useState(1.5);
    const [iconSize, setIconSize] = useState(40);
    const deferredQuery = useDeferredValue(query);

    const filteredIconNames = useMemo(() => {
        const normalizedQuery = deferredQuery.trim().toLowerCase();
        if (!normalizedQuery) return ICON_NAMES;
        return ICON_NAMES.filter((name) => name.includes(normalizedQuery));
    }, [deferredQuery]);

    return (
        <>
            <Grid withGap>
                <GridItem sm={2} xs={1}>
                    <Card className={styles.searchCard}>
                        <label className={styles.searchWrap}>
                            <span className={styles.searchLabel}>Search</span>
                            <input
                                className={styles.searchInput}
                                placeholder="Örn: arrow, chart, smile"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </label>
                        <p className={styles.meta}>
                            {filteredIconNames.length} icon listeleniyor
                        </p>
                    </Card>
                </GridItem>

                <GridItem sm={2} xs={1}>
                    <Card className={styles.controlsCard}>
                        <p>İkonlara tıklayarak TSX kullanım snippet’ını kopyalayabilirsin.</p>

                        <div className={styles.controls}>
                            <label className={styles.rangeWrap}>
                                <span className={styles.searchLabel}>Icon Size: {iconSize}px</span>
                                <input
                                    type="range"
                                    min={16}
                                    max={64}
                                    step={1}
                                    value={iconSize}
                                    className={styles.rangeInput}
                                    onChange={(event) => setIconSize(Number(event.target.value))}
                                />
                            </label>

                            <label className={styles.rangeWrap}>
                                <span className={styles.searchLabel}>Stroke Width: {strokeWidth}px</span>
                                <input
                                    type="range"
                                    min={0.5}
                                    max={3}
                                    step={0.5}
                                    value={strokeWidth}
                                    className={styles.rangeInput}
                                    onChange={(event) => setStrokeWidth(Number(event.target.value))}
                                />
                            </label>
                        </div>
                    </Card>
                </GridItem>
            </Grid>
            
            <IconsGallery
                filteredIconNames={filteredIconNames}
                iconSize={iconSize}
                strokeWidth={strokeWidth} // İsterseniz bu değeri de kontrol edilebilir yapabilirsiniz
            />
        </>
    );
}