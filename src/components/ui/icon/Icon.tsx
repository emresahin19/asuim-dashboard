import * as Icons from './icons';
import { IconName } from '@/types';

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({
  name,
  size = 16,
  className,
}: IconProps) {
  const iconName = name
    .split('-')
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('') as keyof typeof Icons;
  
  const Component = Icons[iconName];

  if (!Component) return null;

  return (
    <Component
      width={size}
      height={size}
      className={className}
    />
  );
}
