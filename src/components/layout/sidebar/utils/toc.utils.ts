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

export function findVisibleActiveId(
    items: SidebarItem[],
    activeId: string | null,
    openGroups: Set<string>
): string | null {
    if (!activeId) return null

    const path = findItemPathById(items, activeId)
    if (!path || !path.length) return null

    let visibleId: string | null = null

    for (let index = 0; index < path.length; index += 1) {
        const node = path[index]
        visibleId = node.id

        const next = path[index + 1]
        if (!next) break

        const nodeIsGroup = !!(node.children && node.children.length > 0)
        if (nodeIsGroup && !openGroups.has(node.id)) {
            break
        }
    }

    return visibleId
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
