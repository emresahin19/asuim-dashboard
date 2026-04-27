import { SidebarState, SidebarItem, TocTokens } from '@/types'

function normalizePath(path: string): string {
    if (!path) return '/'
    if (path === '/') return '/'
    return path.endsWith('/') ? path.slice(0, -1) : path
}

function isPathPrefixMatch(basePath: string, currentPath: string): boolean {
    const base = normalizePath(basePath)
    const current = normalizePath(currentPath)

    if (base === '/') return current === '/'
    if (current === base) return true

    return current.startsWith(`${base}/`)
}

function findBestPrefixMatchId(
    items: SidebarItem[],
    pathname: string,
    currentBest: { id: string; hrefLength: number } | null = null
): { id: string; hrefLength: number } | null {
    let best = currentBest

    for (const item of items) {
        if (item.href && isPathPrefixMatch(item.href, pathname)) {
            const hrefLength = normalizePath(item.href).length
            if (!best || hrefLength > best.hrefLength) {
                best = { id: item.id, hrefLength }
            }
        }

        if (item.children) {
            best = findBestPrefixMatchId(item.children, pathname, best)
        }
    }

    return best
}

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

    const bestPrefixMatch = findBestPrefixMatchId(items, pathname)
    return bestPrefixMatch?.id || null
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
