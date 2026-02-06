import { TOKENS } from "./toc.tokens"
import { PathSegment, Waypoint } from "./toc.types"

export function buildSvgPath(segments: PathSegment[]): string {
    const d: string[] = []

    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]
        const prev = segments[i - 1]
        const next = segments[i + 1]

        if (i === 0) {
            d.push(`M${seg.offset} ${seg.top}`)
        } else if (prev && prev.offset !== seg.offset) {
            d.push(
                `Q${seg.offset} ${seg.top},${seg.offset} ${seg.top + TOKENS.cornerRadius}`
            )
        } else {
            d.push(`L${seg.offset} ${seg.top}`)
        }

        if (next && next.offset !== seg.offset) {
            const cornerBottom = seg.bottom
            d.push(`L${seg.offset} ${cornerBottom - TOKENS.cornerRadius}`)

            const dx = next.offset - seg.offset
            const dy = next.top - cornerBottom
            const len = Math.hypot(dx, dy)
            const r = Math.min(TOKENS.cornerRadius / len, 0.5)

            const mx = seg.offset + dx * r
            const my = cornerBottom + dy * r

            d.push(`Q${seg.offset} ${cornerBottom},${mx} ${my}`)
        } else {
            d.push(`L${seg.offset} ${seg.bottom}`)
        }
    }

    return d.join(' ')
}

export function measureToc(container: HTMLElement): PathSegment[] {
    const items = Array.from(
        container.querySelectorAll<HTMLElement>('[data-toc-item]')
    )
    const baseTop = container.getBoundingClientRect().top

    return items.map((el) => {
        const rect = el.getBoundingClientRect()
        const depth = Number(el.dataset.depth)

        const top = rect.top - baseTop
        const bottom = top + rect.height
        const center = top + rect.height / 2

        return {
            offset: TOKENS.indentBase + (depth - 1) * TOKENS.indentStep,
            top,
            center,
            bottom,
        }
    })
}

export function getCornerY(
    segments: PathSegment[],
    fromIndex: number,
    toIndex: number
): number | null {
    if (fromIndex === toIndex) return null
    const dir = Math.sign(toIndex - fromIndex)
    let i = fromIndex

    while (i !== toIndex) {
        const current = segments[i]
        const next = segments[i + dir]

        if (!current || !next) return null

        // X offset değişiyorsa burada köşe var
        if (current.offset !== next.offset) {
            return current.bottom
        }

        i += dir
    }

    return null
}

export function buildStepWaypoints(
    from: PathSegment,
    to: PathSegment,
    dir: 1 | -1
): Waypoint[] {
    if (from.offset === to.offset) {
        return [{ x: to.offset, y: to.center }]
    }

    if (dir === 1) {
        return [
            { x: from.offset, y: from.bottom },
            { x: to.offset, y: to.top },
            { x: to.offset, y: to.center },
        ]
    }

    return [
        { x: from.offset, y: from.top },
        { x: to.offset, y: to.bottom },
        { x: to.offset, y: to.center },
    ]
}

export function buildRouteWaypoints(
    segments: PathSegment[],
    fromIndex: number,
    toIndex: number
): Waypoint[] {
    if (!segments.length) return []

    if (fromIndex === toIndex) {
        const s = segments[fromIndex]
        return s ? [{ x: s.offset, y: s.center }] : []
    }

    const dir = (toIndex > fromIndex ? 1 : -1) as 1 | -1
    const route: Waypoint[] = []

    // Başlangıç: current center
    const start = segments[fromIndex]
    if (!start) return []
    route.push({ x: start.offset, y: start.center })

    // Aradaki tüm indexleri tek tek dolaş
    let i = fromIndex
    while (i !== toIndex) {
        const a = segments[i]
        const b = segments[i + dir]
        if (!a || !b) break

        const steps = buildStepWaypoints(a, b, dir)

        // duplicate noktaları ekleme (aynı x,y tekrar etmesin)
        for (const p of steps) {
            const last = route[route.length - 1]
            if (!last || last.x !== p.x || last.y !== p.y) route.push(p)
        }

        i += dir
    }

    return route
}