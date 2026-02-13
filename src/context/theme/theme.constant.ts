import { ThemeState } from "@/types"

export const defaultTheme: ThemeState = {
    scheme: 'light',
    primary: 'amber',
    direction: 'ltr',
    palette: 'stone',
    sidebarState: 'open',
}

export const allowedSchemes: ThemeState['scheme'][] = ['light', 'dark']
export const allowedDirections: ThemeState['direction'][] = ['ltr', 'rtl']
export const allowedPalettes: ThemeState['palette'][] = ['slate', 'gray', 'zinc', 'neutral', 'stone']
export const allowedSidebarStates: ThemeState['sidebarState'][] = ['open', 'icon', 'closed']
export const allowedPrimaries: ThemeState['primary'][] = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
]

export const THEME_STORAGE_KEY = 'asuim.theme'
