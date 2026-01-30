export type ColorScheme = 'light' | 'dark'
export type Direction = 'ltr' | 'rtl'
export type Palette = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
export type PrimaryColor = 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose'

export type ThemeState = {
    scheme: ColorScheme
    primary: PrimaryColor
    palette: Palette
    direction: Direction
}
