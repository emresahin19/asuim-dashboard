'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './toc.module.scss'
import { TocItem, TocSvgData } from './toc.types'
import { buildRouteWaypoints, buildSvgPath, getCornerY, measureToc } from './toc.utils'
import { TOKENS } from './toc.tokens'

const toc: TocItem[] = [
  { id: 'a', label: 'Intro', depth: 1 },
  { id: 'b', label: 'Install', depth: 2 },
  { id: 'c', label: 'Usage', depth: 2 },
  { id: 'd', label: 'API', depth: 1 },
]

/* ---------------- COMPONENT ---------------- */
export function Toc() {
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [svg, setSvg] = useState<TocSvgData | null>(null)
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)
  const prevActiveRef = useRef(0)
  const timersRef = useRef<number[]>([])

  function clearTimers() {
    for (const t of timersRef.current) window.clearTimeout(t)
    timersRef.current = []
  }

  function recompute() {
    if (!listRef.current) return

    const segments = measureToc(listRef.current)
    if (!segments.length) return

    const path = buildSvgPath(segments)
    const width = Math.max(...segments.map((s) => s.offset)) + 4
    const height = segments[segments.length - 1].bottom

    setSvg({ path, width, height, segments })
  }

  useLayoutEffect(() => {
    requestAnimationFrame(recompute)
  }, [])

  useEffect(() => {
    if (!listRef.current) return

    const ro = new ResizeObserver(() => requestAnimationFrame(recompute))
    ro.observe(listRef.current)

    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!svg) return

    clearTimers()

    const route = buildRouteWaypoints(svg.segments, prevActiveRef.current, active)
    if (!route.length) return

    // Dot’u route[0]’a kilitle
    setDotX(route[0].x)
    setDotY(route[0].y)

    // Her waypoint arası süre (istersen token yap)
    const STEP_MS = 140

    for (let k = 1; k < route.length; k++) {
      const t = window.setTimeout(() => {
        setDotX(route[k].x)
        setDotY(route[k].y)
      }, STEP_MS * k)
      timersRef.current.push(t)
    }

    return () => clearTimers()
  }, [active, svg])

  useEffect(() => {
    prevActiveRef.current = active
  }, [active])

  return (
    <div className={styles.root}>
      {svg && (
        <svg className={styles.svg} width={svg.width} height={svg.height}>
          <path
            d={svg.path}
            stroke="var(--color-border)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <g
            style={{
              transform: `translate(${dotX}px, ${dotY}px)`,
              transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <circle
              cx={0}
              cy={0}
              r="3"
              fill="var(--color-primary)"
            />
          </g>
        </svg>
      )}

      <ul ref={listRef} className={styles.list}>
        {toc.map((item, i) => (
          <li
            key={item.id}
            data-toc-item
            data-depth={item.depth}
            data-active={i === active}
            style={{ paddingLeft: item.depth * TOKENS.indentStep }}
            onClick={() => setActive(i)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
