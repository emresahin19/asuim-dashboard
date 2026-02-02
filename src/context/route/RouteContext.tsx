'use client';

import { createContext, useContext } from 'react';

export interface BreadcrumbItem {
    title: string;
    path: string;
}

export interface RouteContextValue {
    title?: string;
    breadcrumbs: BreadcrumbItem[];
}

const RouteContext = createContext<RouteContextValue | null>(null);

export function RouteProvider({
    value,
    children,
}: {
    value: RouteContextValue;
    children: React.ReactNode;
}) {
    return (
        <RouteContext.Provider value={value}>
            {children}
        </RouteContext.Provider>
    );
}

export function useRoute() {
    const ctx = useContext(RouteContext);
    if (!ctx) {
        throw new Error('useRoute must be used inside RouteProvider');
    }
    return ctx;
}
