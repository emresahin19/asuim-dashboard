import { PathSegment, TocTokens, Waypoint } from "./toc.types"

export function buildSvgPath(segments: PathSegment[], tokens: TocTokens): string {
    if (segments.length === 0) return '';
    const d: string[] = [];

    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const prev = segments[i - 1];
        const next = segments[i + 1];

        // İlk nokta M (Move), diğerleri L (Line) veya Q (Quadratic Curve)
        if (i === 0) {
            d.push(`M${seg.offset} ${seg.top}`);
        } else if (prev && prev.offset !== seg.offset) {
            d.push(`Q${seg.offset} ${seg.top}, ${seg.offset} ${seg.top + tokens.cornerRadius}`);
        } else {
            d.push(`L${seg.offset} ${seg.top}`);
        }

        if (next && next.offset !== seg.offset) {
            const cornerBottom = seg.bottom;
            d.push(`L${seg.offset} ${cornerBottom - tokens.cornerRadius}`);
            const dx = next.offset - seg.offset;
            const dy = next.top - cornerBottom;
            const len = Math.hypot(dx, dy);
            const r = Math.min(tokens.cornerRadius / len, 0.5);
            const mx = seg.offset + dx * r;
            const my = cornerBottom + dy * r;
            d.push(`Q${seg.offset} ${cornerBottom}, ${mx} ${my}`);
        } else {
            d.push(`L${seg.offset} ${seg.bottom}`);
        }
    }

    return d.join(' ');
}

export function buildPathFromWaypoints(
    points: Waypoint[],
    tokens: TocTokens
): string {
    if (points.length === 0) return ''

    const d: string[] = []

    for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const prev = points[i - 1]
        const next = points[i + 1]

        // başlangıç
        if (i === 0) {
            d.push(`M${p.x} ${p.y}`)
            continue
        }

        // yön vektörleri
        const vx0 = prev ? p.x - prev.x : 0
        const vy0 = prev ? p.y - prev.y : 0
        const vx1 = next ? next.x - p.x : 0
        const vy1 = next ? next.y - p.y : 0

        const isCorner =
            prev &&
            next &&
            (Math.sign(vx0) !== Math.sign(vx1) ||
                Math.sign(vy0) !== Math.sign(vy1))

        if (!isCorner || !next) {
            // düz devam
            d.push(`L${p.x} ${p.y}`)
            continue
        }

        // köşe yumuşatma
        const len0 = Math.hypot(vx0, vy0)
        const len1 = Math.hypot(vx1, vy1)

        if (len0 === 0 || len1 === 0) {
            d.push(`L${p.x} ${p.y}`)
            continue
        }

        const r0 = Math.min(tokens.cornerRadius / len0, 0.5)
        const r1 = Math.min(tokens.cornerRadius / len1, 0.5)

        const cx0 = p.x - vx0 * r0
        const cy0 = p.y - vy0 * r0

        const cx1 = p.x + vx1 * r1
        const cy1 = p.y + vy1 * r1

        d.push(`L${cx0} ${cy0}`)
        d.push(`Q${p.x} ${p.y}, ${cx1} ${cy1}`)
    }

    return d.join(' ')
}

export function measureToc(container: HTMLElement, tokens: TocTokens): PathSegment[] {
    const items = Array.from(
        container.querySelectorAll<HTMLElement>('[data-toc-item]')
    )
    const baseTop = container.getBoundingClientRect().top

    return items.map((el) => {
        const rect = el.getBoundingClientRect()
        const depth = Number(el.dataset.depth)

        const realTop = rect.top - baseTop
        const realBottom = realTop + rect.height

        const top = realTop - tokens.itemPadding
        const bottom = realBottom + tokens.itemPadding
        const center = realTop + rect.height / 2

        return {
            offset: tokens.indentBase + (depth - 1) * tokens.indentStep,
            top,
            center,
            bottom,
        }
    })
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

    const safeFrom = clampToNearestIndex(fromIndex, segments)
    const safeTo = clampToNearestIndex(toIndex, segments)

    if (safeFrom === -1 || safeTo === -1) return []

    if (safeFrom === safeTo) {
        const s = segments[safeFrom]
        return s ? [{ x: s.offset, y: s.center }] : []
    }

    const dir = (safeTo > safeFrom ? 1 : -1) as 1 | -1
    const route: Waypoint[] = []

    const start = segments[safeFrom]
    if (!start) return []

    route.push({ x: start.offset, y: start.center })

    let i = safeFrom
    while (i !== safeTo) {
        const a = segments[i]
        const b = segments[i + dir]
        if (!a || !b) break

        const steps = buildStepWaypoints(a, b, dir)

        for (const p of steps) {
            const last = route[route.length - 1]
            if (!last || last.x !== p.x || last.y !== p.y) {
                route.push(p)
            }
        }

        i += dir
    }

    return route
}

function clampToNearestIndex(
    index: number,
    segments: PathSegment[]
): number {
    if (segments.length === 0) return -1

    if (index < 0) return 0
    if (index >= segments.length) return segments.length - 1

    return index
}