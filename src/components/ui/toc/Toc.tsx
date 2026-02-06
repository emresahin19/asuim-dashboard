'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './toc.module.scss'
import { TocProps, TocSvgData, Waypoint } from './toc.types'
import { buildCenterToCenterPath, buildPathFromWaypoints, buildRouteWaypoints, buildSvgPath, measureToc } from './toc.utils'
import AsimImage from '@/assets/image/asimthecat-120x120.png'
import { TOKENS } from './toc.tokens'

export function Toc({
  containerRef,
  activeIndex,
  tokens,
}: TocProps) {
  const prevActiveRef = useRef(activeIndex)

  const [svg, setSvg] = useState<TocSvgData | null>(null)

  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)

  const [prevActiveDot, setPrevActiveDot] = useState({ x: 0, y: 0 })

  const [activePath, setActivePath] = useState('')

  const [activeRoute, setActiveRoute] = useState<Waypoint[]>([])
  const [activeStep, setActiveStep] = useState(0)

  const timersRef = useRef<number[]>([])
  const [currentStepMs, setCurrentStepMs] = useState(140)

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

    const fullPath = buildSvgPath(segments, tokensWithDefaults)
    const width = Math.max(...segments.map(s => s.offset)) + 4
    const height = segments[segments.length - 1].bottom

    setSvg({ path: fullPath, width, height, segments })
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

  /* DOT + ROUTE ANIMASYONU */
  useEffect(() => {
    if (!svg || !svg.segments[activeIndex]) return

    if (activeIndex === prevActiveRef.current) {
      const s = svg.segments[activeIndex]
      setDotX(s.offset)
      setDotY(s.center)
      return
    }

    const fromIndex = prevActiveRef.current
    prevActiveRef.current = activeIndex

    clearTimers()

    const route = buildRouteWaypoints(
      svg.segments,
      fromIndex,
      activeIndex
    )

    if (!route.length) return

    setActiveRoute(route)
    setActiveStep(0)

    const indexDiff = Math.abs(activeIndex - fromIndex)
    const totalDuration = Math.min(150 + indexDiff * 50, 450)
    const stepMs = totalDuration / (route.length - 1)

    setCurrentStepMs(stepMs)

    setDotX(route[0].x)
    setDotY(route[0].y)

    for (let k = 1; k < route.length; k++) {
      const t = window.setTimeout(() => {
        setDotX(route[k].x)
        setDotY(route[k].y)
        setActiveStep(k)
      }, stepMs * k)

      timersRef.current.push(t)
    }

    return () => clearTimers()
  }, [activeIndex, svg])

  useEffect(() => {
    if (!activeRoute.length) return

    const partial = activeRoute.slice(0, activeStep + 1)
    const s = partial[0]
    setActivePath(buildPathFromWaypoints(partial, tokensWithDefaults))
    setPrevActiveDot({ x: s.x, y: s.y })
  }, [activeRoute, activeStep, tokensWithDefaults])

  return svg && (
    <div className={styles.container}>
      <svg className={styles.svg} width={svg.width} height={svg.height}>
        {/* Base path */}
        <path
          d={svg.path}
          stroke="var(--color-border)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Active path */}
        <path
          d={activePath}
          stroke="var(--primary-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <g style={{ transform: `translate(${prevActiveDot.x}px, ${prevActiveDot.y}px)` }}>
          <circle cx={0} cy={0} r="3" fill="var(--primary-500)" />
        </g>
        <g
          style={{
            transform: `translate(${dotX}px, ${dotY}px)`,
            transition: `transform ${currentStepMs}ms ease-in-out`,
          }}
        >
          <image href={AsimImage.src} x={-12} y={-12} width={24} height={24} />
        </g>
      </svg>
    </div>
  )
}

/* WAYPOINT → PATH */