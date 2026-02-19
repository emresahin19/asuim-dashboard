"use client";

import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Grid, GridItem, Icon, ICON_NAMES } from '@/components';
import { IconName } from '@/types';
import styles from './icons.module.scss';

type IconTileProps = {
    name: IconName;
    copied: boolean;
    onCopy: (name: IconName) => void;
};

const IconTile = memo(function IconTile({ name, copied, onCopy }: IconTileProps) {
    const tileRef = useRef<HTMLButtonElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = tileRef.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.01,
                rootMargin: '120px 0px',
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <button
            ref={tileRef}
            type="button"
            className={styles.itemButton}
            onClick={() => onCopy(name)}
            data-tooltip={copied ? 'Copied' : name}
            aria-label={name}
        >
            <Card className={`${styles.itemCard} ${copied ? styles.copied : ''}`}>
                {isVisible ? (
                    <Icon
                        name={name}
                        className={styles.itemIcon}
                    />
                ) : null}
            </Card>
        </button>
    );
});

export default function IconsPage() {
    const [query, setQuery] = useState('');
    const [copiedName, setCopiedName] = useState<string | null>(null);
    const [iconSize, setIconSize] = useState(40);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const deferredQuery = useDeferredValue(query);

    const filteredIcons = useMemo(() => {
        const normalizedQuery = deferredQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return ICON_NAMES;
        }

        return ICON_NAMES.filter((name) => name.includes(normalizedQuery));
    }, [deferredQuery]);

    const handleCopy = async (iconName: IconName) => {
        const snippet = `<Icon name="${iconName}" size={${iconSize}} strokeWidth={${strokeWidth}} />`;

        try {
            await navigator.clipboard.writeText(snippet);
            setCopiedName(iconName);

            window.setTimeout(() => {
                setCopiedName((current) => (current === iconName ? null : current));
            }, 1400);
        } catch {
            setCopiedName(null);
        }
    };

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
                            {filteredIcons.length} icon listeleniyor
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

            <div
                className={styles.grid}
                style={{
                    '--preview-icon-size': `${iconSize}px`,
                    '--icon-stroke-width': `${strokeWidth}px`,
                } as React.CSSProperties}
            >
                {filteredIcons.map((name) => (
                    <IconTile
                        key={name}
                        name={name}
                        copied={copiedName === name}
                        onCopy={handleCopy}
                    />
                ))}
            </div>
        </>
    );
}
