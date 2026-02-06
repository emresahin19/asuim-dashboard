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

export function buildCenterToCenterPath(segments: PathSegment[], tokens: TocTokens): string {
    if (segments.length === 0) return '';
    const d: string[] = [];

    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const prev = segments[i - 1];
        const next = segments[i + 1];

        // İlk nokta M (Move), diğerleri L (Line) veya Q (Quadratic Curve)
        if (i === 0) {
            d.push(`M${seg.offset} ${seg.center}`);
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
            d.push(`L${seg.offset} ${seg.center}`);
        }
    }

    return d.join(' ');
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

export function getPathLengthAtY(
    path: SVGPathElement | null,
    targetY: number,
    precision = 1
): number {
    if (!path) return 0
    const total = path.getTotalLength()
    let prev = path.getPointAtLength(0)

    for (let l = 0; l <= total; l += precision) {
        const p = path.getPointAtLength(l)
        if (
            (prev.y <= targetY && p.y >= targetY) ||
            (prev.y >= targetY && p.y <= targetY)
        ) {
            return l
        }
        prev = p
    }

    return total
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

    // Aşağı inerken: Mevcut olanın altından çık, yenisinin tepesinden gir
    if (dir === 1) {
        return [
            { x: from.offset, y: from.bottom },
            { x: to.offset, y: to.top },
            { x: to.offset, y: to.center },
        ]
    }

    // Yukarı çıkarken: Mevcut olanın tepesinden çık, yenisinin altından gir
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