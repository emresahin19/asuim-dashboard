export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    withGap?: boolean;
    withPadding?: boolean;
    className?: string;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    className?: string;
}