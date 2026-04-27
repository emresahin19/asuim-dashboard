// components/Icon.tsx
import React from 'react';

// Standard types for the Icon component
type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  // We want the Component itself, not a string
  icon: SvgIconComponent;
  size?: number | string;
  strokeWidth?: number;
  decorative?: boolean;
  label?: string;
}

export function Icon({
  icon: IconComponent, // Alias to use the prop internally
  size = 24,           // Default values can be set here
  strokeWidth,
  decorative = true,
  label,
  className,
  style,
  ...rest
}: IconProps) {

  // Guard against missing icon prop to avoid errors
  if (!IconComponent) return null;

  return (
    <IconComponent
      width="1em"
      height="1em"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? label : undefined}
      {...rest}
    />
  );
}