'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './toc.module.scss'
import { TocProps, TocSvgData } from './toc.types'
import { buildRouteWaypoints, buildSvgPath, measureToc } from './toc.utils'
import AsimImage from '@/assets/image/asimthecat-120x120.png'
import { TOKENS } from './toc.tokens'

export function Toc({ containerRef, activeIndex, tokens }: TocProps) {
  const prevActiveRef = useRef(activeIndex)
  const [svg, setSvg] = useState<TocSvgData | null>(null)
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)
  const timersRef = useRef<number[]>([])
  const [currentStepMs, setCurrentStepMs] = useState(140);

  const tokensWithDefaults = useMemo(
    () => ({ ...TOKENS, ...tokens }),
    [tokens]
  )

  function clearTimers() {
    for (const t of timersRef.current) window.clearTimeout(t)
    timersRef.current = []
  }

  const recompute = useCallback(() => {
    if (!containerRef?.current) return

    const segments = measureToc(containerRef.current, tokensWithDefaults)
    if (!segments.length) return

    const path = buildSvgPath(segments, tokensWithDefaults)
    const width = Math.max(...segments.map(s => s.offset)) + 4
    const height = segments[segments.length - 1].bottom

    setSvg({ path, width, height, segments })
  }, [containerRef, tokensWithDefaults])

  useLayoutEffect(() => {
    requestAnimationFrame(recompute)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.parentElement?.classList.add(styles.root)

    const schedule = () => requestAnimationFrame(recompute)

    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(container)

    const mutationObserver = new MutationObserver(schedule)
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [containerRef, tokensWithDefaults])

  useEffect(() => {
    if (!svg || activeIndex === undefined || !svg.segments[activeIndex]) {
      return;
    }

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
    
    if (!route.length) {
      const target = svg.segments[activeIndex];
      if (target) {
        setDotX(target.offset);
        setDotY(target.center);
      }
      return;
    }

    const indexDiff = Math.abs(activeIndex - fromIndex);

    const totalDuration = Math.min(150 + (indexDiff * 50), 450);

    const stepMs = totalDuration / (route.length - 1);

    setCurrentStepMs(stepMs);
    setDotX(route[0].x);
    setDotY(route[0].y);

    for (let k = 1; k < route.length; k++) {
      const t = window.setTimeout(() => {
        setDotX(route[k].x);
        setDotY(route[k].y);
      }, stepMs * k);
      timersRef.current.push(t);
    }

    return () => clearTimers();
  }, [activeIndex, svg]);

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
          <image href={AsimImage.src} x={-12} y={-12} width={24} height={24} />
          {/* <circle cx={0} cy={0} r="3" fill="var(--color-primary)" /> */}
        </g>
      </svg>
    </div>
  )
}
