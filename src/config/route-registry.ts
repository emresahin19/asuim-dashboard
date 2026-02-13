export interface RouteDefinition {
    id: string;
    path: string;
    title: string;
    description?: string;

    search?: {
        keywords?: string[];
        aliases?: string[];
    };
}

export const routeRegistry: RouteDefinition[] = [
    { id: 'dashboard', path: '/dashboard', title: 'Dashboard' },
    { id: 'status', path: '/status', title: 'System Status' },

    { id: 'tokens', path: '/foundations/tokens', title: 'Design Tokens' },
    { id: 'themes', path: '/foundations/themes', title: 'Themes' },
    { id: 'layout', path: '/foundations/layout', title: 'Grid & Layout' },

    { id: 'type-system', path: '/typography/system', title: 'Type System' },
    { id: 'buttons', path: '/components/buttons', title: 'Buttons' },
    { id: 'components', path: '/components', title: 'Components' },
    { id: 'components-form', path: '/components/form', title: 'Form' },
    { id: 'components-form-input', path: '/components/form/input', title: 'Input' },
    { id: 'components-form-checkbox', path: '/components/form/checkbox', title: 'Checkbox' },
    { id: 'navigation', path: '/components/navigation', title: 'Navigation' },

    { id: 'icons', path: '/utilities/icons', title: 'Icons' },
    { id: 'colors', path: '/utilities/colors', title: 'Colors' },

    { id: 'accessibility', path: '/system/accessibility', title: 'Accessibility' },
    { id: 'performance', path: '/system/performance', title: 'Performance' },
];

export const routesById = Object.fromEntries(
    routeRegistry.map((r) => [r.id, r] as const)
) satisfies Record<string, RouteDefinition>;
