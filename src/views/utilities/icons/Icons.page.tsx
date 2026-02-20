"use client";

import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Card, Grid, GridItem, Icon } from '@/components';

import styles from './icons.module.scss';

type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type IconEntry = {
    name: string;
    exportName: string;
    component: SvgIconComponent;
};

function toKebabCaseIconName(name: string) {
    return name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])/g, '$1-$2')
        .replace(/([A-Za-z])([0-9])/g, '$1-$2')
        .replace(/([0-9])([0-9])/g, '$1-$2')
        .toLowerCase();
}

type IconTileProps = {
    entry: IconEntry;
    copied: boolean;
    iconSize: number;
    strokeWidth: number;
    onCopy: (entry: IconEntry) => void;
};

const IconTile = memo(function IconTile({ entry, copied, iconSize, strokeWidth, onCopy }: IconTileProps) {
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
            onClick={() => onCopy(entry)}
            data-tooltip={copied ? 'Copied' : entry.name}
            aria-label={entry.name}
        >
            <Card className={`${styles.itemCard} ${copied ? styles.copied : ''}`}>
                {isVisible ? (
                    <Icon
                        icon={entry.component}
                        className={styles.itemIcon}
                        size={iconSize}
                        strokeWidth={strokeWidth}
                    />
                ) : null}
            </Card>
        </button>
    );
});


export default function IconsPage() {
    const [iconEntries, setIconEntries] = useState<IconEntry[]>([]);
    const [query, setQuery] = useState('');
    const [copiedName, setCopiedName] = useState<string | null>(null);
    const [iconSize, setIconSize] = useState(40);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
        let isMounted = true;
        void import('@/components/ui/icon/icons').then((module) => {
            if (!isMounted) {
                return;
            }

            const entries = Object.entries(module)
                .filter(([, component]) => typeof component === 'function')
                .map(([exportName, component]) => ({
                    exportName,
                    name: toKebabCaseIconName(exportName),
                    component: component as SvgIconComponent,
                }))
                .sort((first, second) => first.name.localeCompare(second.name));
            setIconEntries(entries);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const filteredIcons = useMemo(() => {
        const normalizedQuery = deferredQuery.trim().toLowerCase();
        
        if (!normalizedQuery) {
            return iconEntries;
        }

        return iconEntries.filter((entry) => entry.name.includes(normalizedQuery));
    }, [deferredQuery, iconEntries]);

    const handleCopy = async (entry: IconEntry) => {
        const snippet = `import { ${entry.exportName} as ${entry.exportName}Icon } from '@/components/ui/icon/icons'\n\n<Icon icon={${entry.exportName}Icon} size={${iconSize}} strokeWidth={${strokeWidth}} />`;

        try {
            await navigator.clipboard.writeText(snippet);
            setCopiedName(entry.name);

            window.setTimeout(() => {
                setCopiedName((current) => (current === entry.name ? null : current));
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
                {filteredIcons.map((entry) => (
                    <IconTile
                        key={entry.name}
                        entry={entry}
                        copied={copiedName === entry.name}
                        iconSize={iconSize}
                        strokeWidth={strokeWidth}
                        onCopy={handleCopy}
                    />
                ))}
            </div>
        </>
    );
} 