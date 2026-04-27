export interface Tab {
    id: string | number;
    label: string;
    href: string;
    segment: string | null;
}

export interface ControlledTab {
    id: string;
    label: string;
}