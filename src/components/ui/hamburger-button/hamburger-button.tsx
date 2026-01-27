import { clsx } from "@/utils/clsx";
import {
    Hamburger1,
    Hamburger2,
    Hamburger3,
    Hamburger4,
    Hamburger5,
    Hamburger6,
    Hamburger7,
    Hamburger8
} from "./variants";
import styles from './hamburger-button.module.scss';

type Variant = 'Hamburger1' | 'Hamburger2' | 'Hamburger3' | 'Hamburger4' | 'Hamburger5' | 'Hamburger6' | 'Hamburger7' | 'Hamburger8';

const variantsMap: Record<Variant, React.FC<{ isActive?: boolean }>> = {
    'Hamburger1': Hamburger1,
    'Hamburger2': Hamburger2,
    'Hamburger3': Hamburger3,
    'Hamburger4': Hamburger4,
    'Hamburger5': Hamburger5,
    'Hamburger6': Hamburger6,
    'Hamburger7': Hamburger7,
    'Hamburger8': Hamburger8,
};

export const Hamburger = ({
    isActive,
    variant = 'Hamburger1',
    className,
    onClick,
}: {
    isActive?: boolean;
    variant?: Variant;
    onClick?: () => void;
    className?: string;
}) => {
    const SelectedVariant = variantsMap[variant];

    return (
        <button
            className={clsx(styles.button, className)}
            onClick={onClick}
            aria-label="Toggle menu"
            onTouchStart={(e) => {
                e.stopPropagation();
                onClick!();
            }}
        >
            <SelectedVariant isActive={isActive} />
        </button>
    );
};