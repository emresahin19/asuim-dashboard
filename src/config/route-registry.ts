import { RouteDefinition } from "@/types";

export const routeRegistry: RouteDefinition[] = [
    { id: 'dashboard', path: '/dashboard', title: 'Dashboard' },
    { id: 'status', path: '/status', title: 'System Status' },

    { id: 'tokens', path: '/foundations/tokens', title: 'Design Tokens' },
    { id: 'themes', path: '/foundations/themes', title: 'Themes' },
    { id: 'layout', path: '/foundations/layout', title: 'Grid & Layout' },

    { id: 'type-system', path: '/typography/system', title: 'Type System' },
    { id: 'buttons', path: '/components/buttons', title: 'Buttons' },
    { id: 'table', path: '/components/table', title: 'Table' },
    { id: 'components', path: '/components', title: 'Components' },
    { id: 'components-form', path: '/components/form', title: 'Form' },
    { id: 'components-form-input', path: '/components/form/input', title: 'Input' },
    { id: 'components-form-checkbox', path: '/components/form/checkbox', title: 'Checkbox' },
    { id: 'components-form-select', path: '/components/form/select', title: 'Select' },
    { id: 'components-form-radio', path: '/components/form/radio', title: 'Radio' },
    { id: 'components-form-switch', path: '/components/form/switch', title: 'Switch' },
    { id: 'components-form-range', path: '/components/form/range', title: 'Range' },
    { id: 'components-form-date-picker', path: '/components/form/date-picker', title: 'Date Picker' },
    { id: 'navigation', path: '/components/navigation', title: 'Navigation' },

    { id: 'icons', path: '/utilities/icons', title: 'Icons' },
    { id: 'colors', path: '/utilities/colors', title: 'Colors' },

    { id: 'accessibility', path: '/system/accessibility', title: 'Accessibility' },
    { id: 'performance', path: '/system/performance', title: 'Performance' },
];
