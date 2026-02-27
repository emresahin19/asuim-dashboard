// components/Icon.tsx
import React from 'react';

// İkon component'ının alacağı standart tipler
type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  // String yerine artık Component'in kendisini istiyoruz
  icon: SvgIconComponent;
  size?: number | string;
  strokeWidth?: number;
  decorative?: boolean;
  label?: string;
}

export function Icon({
  icon: IconComponent, // Prop ismini içeride kullanmak için alias atadık
  size = 24,           // Default değerler verebilirsiniz
  strokeWidth,
  decorative = true,
  label,
  className,
  style,
  ...rest
}: IconProps) {

  // Eğer icon prop'u geçilmediyse hata vermemesi için kontrol
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