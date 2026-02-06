import { SidebarItem } from './sidebar.types'

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

    // 1) Active item DOM’da mı?
    const directIndex = domItems.findIndex(
        (el) => el.dataset.id === activeId
    )
    if (directIndex !== -1) return directIndex

    // 2) Parent zincirini bul
    const path = findItemPathById(items, activeId)
    if (!path) return 0

    // 3) Yukarıdan aşağı ilk DOM’da görüneni yakala
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