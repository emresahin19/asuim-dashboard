import { SidebarState, SidebarItem, TocTokens } from '@/types'

export function findActiveIdByPath(
    items: SidebarItem[],
    pathname: string
): string | null {
    for (const item of items) {
        if (item.href === pathname) return item.id

        if (item.children) {
            const found = findActiveIdByPath(item.children, pathname)
            if (found) return found
        }
    }
    return null
}

export function findItemById(
    items: SidebarItem[],
    id: string
): SidebarItem | null {
    for (const item of items) {
        if (item.id === id) return item
        if (item.children) {
            const found = findItemById(item.children, id)
            if (found) return found
        }
    }
    return null
}

export function findParentItemById(
    items: SidebarItem[],
    id: string
): SidebarItem | null {
    for (const item of items) {
        if (item.children) {
            if (item.children.some((child) => child.id === id)) {
                return item
            }
            const found = findParentItemById(item.children, id)
            if (found) return found
        }
    }
    return null
}

export function isDescendantActive(
    item: SidebarItem,
    activeId: string | null
): boolean {
    if (!activeId) return false
    if (item.id === activeId) return true
    if (!item.children) return false

    return item.children.some((child) =>
        isDescendantActive(child, activeId)
    )
}

export function findItemPathById(
    items: SidebarItem[],
    id: string,
    path: SidebarItem[] = []
): SidebarItem[] | null {
    for (const item of items) {
        const nextPath = [...path, item]

        if (item.id === id) {
            return nextPath
        }

        if (item.children) {
            const found = findItemPathById(item.children, id, nextPath)
            if (found) return found
        }
    }

    return null
}

export function getVisibleActiveIndexById(
    container: HTMLElement,
    activeId: string,
    items: SidebarItem[]
): number {
    const domItems = Array.from(
        container.querySelectorAll<HTMLElement>('[data-toc-item]')
    )

    const directIndex = domItems.findIndex(
        (el) => el.dataset.id === activeId
    )
    if (directIndex !== -1) return directIndex

    const path = findItemPathById(items, activeId)
    if (!path) return 0

    for (const item of path.reverse()) {
        const index = domItems.findIndex(
            (el) => el.dataset.id === item.id
        )
        if (index !== -1) return index
    }

    return 0
}

export function collectActiveGroupIds(
    items: SidebarItem[],
    pathname: string,
    acc: Set<string>
): boolean {
    for (const item of items) {
        if (item.children) {
            const foundInChild = collectActiveGroupIds(item.children, pathname, acc)

            if (foundInChild) {
                acc.add(item.id)
                return true
            }
        }

        if (item.href === pathname) {
            return true
        }
    }

    return false
}


export const sidebarTocTokens: Record<SidebarState, TocTokens> = {
    'open': {
        indentBase: 4,
        indentStep: 16,
        cornerRadius: 4,
        itemPadding: 2,
    },
    'icon': {
        indentBase: 4,
        indentStep: 16,
        cornerRadius: 16,
        itemPadding: 2,
    },
    'closed': {
        indentBase: 0,
        indentStep: 0,
        cornerRadius: 0,
        itemPadding: 0,
    }
}
