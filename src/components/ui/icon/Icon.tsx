import * as Icons from './icons';
import { IconName } from '@/types';
import { clsx } from '@/utils';
import styles from './icon.module.scss';

type IconProps = {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
} & Omit<React.SVGProps<SVGSVGElement>, 'name' | 'width' | 'height'>;

function toPascalCaseIconName(name: string) {
  return name
    .split('-')
    .map((segment) => {
      if (!segment) return segment;

      if (/^\d[a-z]$/i.test(segment)) {
        return `${segment[0]}${segment[1].toUpperCase()}`;
      }

      return segment[0].toUpperCase() + segment.slice(1);
    })
    .join('');
}

function toKebabCaseIconName(name: string): IconName {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([0-9])/g, '$1-$2')
    .toLowerCase() as IconName;
}

export const ICON_NAMES = Object.keys(Icons)
  .map((iconKey) => toKebabCaseIconName(iconKey))
  .sort((first, second) => first.localeCompare(second));

export function Icon({
  name,
  size,
  strokeWidth,
  className,
  style,
  ...rest
}: IconProps) {
  const iconName = toPascalCaseIconName(name) as keyof typeof Icons;
  
  const Component = Icons[iconName];

  if (!Component) return null;

  const iconStyle: React.CSSProperties & {
    '--icon-stroke-width'?: string;
  } = {
    ...style,
    ...(size !== undefined ? { fontSize: size } : {}),
    ...(strokeWidth !== undefined
      ? { '--icon-stroke-width': `${strokeWidth}px` }
      : {}),
  };

  return (
    <Component
      width="1em"
      height="1em"
      className={clsx(styles.root, className)}
      style={iconStyle}
      {...rest}
    />
  );
}
