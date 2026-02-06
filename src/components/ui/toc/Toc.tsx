'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './toc.module.scss'
import { TocProps, TocSvgData } from './toc.types'
import { buildRouteWaypoints, buildSvgPath, measureToc } from './toc.utils'

/* ---------------- COMPONENT ---------------- */
export function Toc({ containerRef, activeIndex }: TocProps) {
  const prevActiveRef = useRef(activeIndex)
  const [svg, setSvg] = useState<TocSvgData | null>(null)
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)
  const timersRef = useRef<number[]>([])
  const [currentStepMs, setCurrentStepMs] = useState(140);

  function clearTimers() {
    for (const t of timersRef.current) window.clearTimeout(t)
    timersRef.current = []
  }

  function recompute() {
    if (!containerRef?.current) return
    const segments = measureToc(containerRef.current)

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
    const container = containerRef.current
    if (!container) return
    container.parentElement?.classList.add(styles.root)

    const schedule = () => requestAnimationFrame(recompute)

    // 1️⃣ Size changes
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(container)

    // 2️⃣ DOM structure changes (group open/close)
    const mutationObserver = new MutationObserver(schedule)
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [containerRef])

  useEffect(() => {
    if (!svg || activeIndex === undefined) return;

    // 1. Durum: Aynı index, animasyona gerek yok
    if (activeIndex === prevActiveRef.current) {
      const target = svg.segments[activeIndex];
      if (target) {
        setDotX(target.offset);
        setDotY(target.center);
      }
      return;
    }

    const fromIndex = prevActiveRef.current;
    prevActiveRef.current = activeIndex;

    clearTimers();

    const route = buildRouteWaypoints(svg.segments, fromIndex, activeIndex);
    if (!route.length) return;

    // --- DİNAMİK SÜRE HESABI ---
    const indexDiff = Math.abs(activeIndex - fromIndex);

    // Toplam süreyi belirle: min 150ms, max 450ms. 
    // Her ek index için +50ms ekleyelim ama 450ms'i geçmesin.
    const totalDuration = Math.min(150 + (indexDiff * 50), 450);

    // Her bir waypoint adımı için süreyi böl (route.length - 1 adet adım var)
    const stepMs = totalDuration / (route.length - 1);
    // ---------------------------
    setCurrentStepMs(stepMs);
    // Noktayı başlangıca kilitle
    setDotX(route[0].x);
    setDotY(route[0].y);

    // Waypoint'leri yeni dinamik süreyle dön
    for (let k = 1; k < route.length; k++) {
      const t = window.setTimeout(() => {
        setDotX(route[k].x);
        setDotY(route[k].y);
      }, stepMs * k);
      timersRef.current.push(t);
    }

    return () => clearTimers();
  }, [activeIndex, svg]);

  useEffect(() => {
    prevActiveRef.current = activeIndex
  }, [activeIndex])

  return svg && (
    <div className={styles.container}>
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
            transition: `transform ${currentStepMs}ms ease-in-out`,
          }}
        >
          <circle cx={0} cy={0} r="3" fill="var(--color-primary)" />
        </g>
      </svg>
    </div>
  )
}
