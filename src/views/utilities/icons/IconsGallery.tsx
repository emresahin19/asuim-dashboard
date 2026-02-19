import { Card, Icon } from "@/components";
import { lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from './icons.module.scss';
    
// İkon dosya ismini (Activity.tsx) bulmak için yardımcı fonksiyon
function toPascalCase(str: string) {
    return str
        .split('-')
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join('');
}

const LazyIconLoader = ({ name, size, strokeWidth, className }: any) => {
    
    const IconComponent = useMemo(() => {
        const fileName = toPascalCase(name);
        
        return lazy(() => 
            import(`@/components/ui/icon/icons/${fileName}.tsx`)
            .catch(() => ({ default: () => null }))
        );
    }, [name]);

    return (
        <Suspense fallback={null}>
            <Icon 
                icon={IconComponent} 
                size={size} 
                strokeWidth={strokeWidth} 
                className={className} 
            />
        </Suspense>
    );
};

const IconTile = memo(function IconTile({ name, copied, iconSize, strokeWidth, onCopy }: any) {
    const tileRef = useRef<HTMLButtonElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = tileRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Bir kere görünce işlemi bitir
                }
            },
            { root: null, threshold: 0.01, rootMargin: '100px 0px' }
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
        >
            <Card className={`${styles.itemCard} ${copied ? styles.copied : ''}`}>
                {isVisible ? (
                    <LazyIconLoader 
                        name={name}
                        size={iconSize}
                        strokeWidth={strokeWidth}
                        className={styles.itemIcon}
                    />
                ) : (
                    <div style={{ width: iconSize, height: iconSize }} /> 
                )}
            </Card>
        </button>
    );
});

const IconsGallery = ({
    strokeWidth,
    iconSize,
    filteredIconNames,
}: {
    strokeWidth: number;
    iconSize: number;
    filteredIconNames: string[];
}) => {
    const [copiedName, setCopiedName] = useState<string | null>(null);
    
    const handleCopy = async (name: string) => {
        const pascalName = toPascalCase(name);
        const snippet = `import { ${pascalName} } from '@/components/ui/icon/icons';\n\n<Icon icon={${pascalName}} size={${iconSize}} />`;

        try {
            await navigator.clipboard.writeText(snippet);
            setCopiedName(name);
            window.setTimeout(() => setCopiedName(null), 1400);
        } catch {
            setCopiedName(null);
        }
    };

    return (
        <div
            className={styles.grid}
            style={{
                '--preview-icon-size': `${iconSize}px`,
                '--icon-stroke-width': `${strokeWidth}px`,
            } as React.CSSProperties}
        >
            {filteredIconNames.map((name) => (
                <IconTile
                    key={name}
                    name={name}
                    copied={copiedName === name}
                    iconSize={iconSize}
                    strokeWidth={strokeWidth}
                    onCopy={handleCopy}
                />
            ))}
        </div>
    )
}

export default IconsGallery;