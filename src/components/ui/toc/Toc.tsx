'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './toc.module.scss'
import { TocProps, TocSvgData } from './toc.types'
import { buildPathFromWaypoints, buildRouteWaypoints, buildSvgPath, measureToc } from './toc.utils'
import AsimImage from '@/assets/image/asimthecat-120x120.png'
import { TOKENS } from './toc.tokens'

export function Toc({ containerRef, activeIndex, tokens }: TocProps) {
  const prevActiveRef = useRef(activeIndex)
  const [svg, setSvg] = useState<TocSvgData | null>(null)
  
  const [activePath, setActivePath] = useState('')
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
  const [currentStepMs, setCurrentStepMs] = useState(140)

  const timersRef = useRef<number[]>([])
  const pathRef = useRef<SVGPathElement>(null)

  const tokensWithDefaults = useMemo(() => ({ ...TOKENS, ...tokens }), [tokens])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current = []
    if (pathRef.current) {
      pathRef.current.style.transition = 'none'
    }
  }, [])

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
    recompute()
    const container = containerRef.current
    if (!container) return
    container.parentElement?.classList.add(styles.root)
    
    const schedule = () => requestAnimationFrame(recompute)
    const ro = new ResizeObserver(schedule)
    const mo = new MutationObserver(schedule)
    
    ro.observe(container)
    mo.observe(container, { childList: true, subtree: true })
    
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [recompute, containerRef])

  useEffect(() => {
    if (!svg || activeIndex === undefined || !svg.segments[activeIndex]) return

    const fromIndex = prevActiveRef.current

    if (activeIndex === fromIndex) {
      const target = svg.segments[activeIndex]
      setDotPos({ x: target.offset, y: target.center })
      return
    }

    prevActiveRef.current = activeIndex
    clearTimers()

    const route = buildRouteWaypoints(svg.segments, fromIndex, activeIndex)
    if (!route.length) return

    const indexDiff = Math.abs(activeIndex - fromIndex)
    const totalDuration = Math.min(150 + indexDiff * 50, 450)
    const stepMs = totalDuration / (route.length - 1)
    
    setCurrentStepMs(stepMs)
    const fullPath = buildPathFromWaypoints(route, tokensWithDefaults)
    setActivePath(fullPath)

    requestAnimationFrame(() => {
      const el = pathRef.current
      if (!el) return

      const length = el.getTotalLength()
      
      el.style.transition = 'none'
      el.style.strokeDasharray = `${length} ${length}`
      el.style.strokeDashoffset = `${length}`
      
      el.getBoundingClientRect()

      requestAnimationFrame(() => {
        el.style.transition = `stroke-dashoffset ${totalDuration}ms ease-in-out`
        el.style.strokeDashoffset = '0'

        const tFade = window.setTimeout(() => {
          if (pathRef.current) {
            pathRef.current.style.transition = `stroke-dashoffset ${totalDuration}ms ease-in-out`
            pathRef.current.style.strokeDashoffset = `${-length}`
          }
        }, totalDuration + 200)
        timersRef.current.push(tFade)
      })
    })

    setDotPos({ x: route[0].x, y: route[0].y })
    for (let k = 1; k < route.length; k++) {
      const t = window.setTimeout(() => {
        setDotPos({ x: route[k].x, y: route[k].y })
      }, stepMs * k)
      timersRef.current.push(t)
    }

    return () => clearTimers()
  }, [activeIndex, svg, tokensWithDefaults, clearTimers])

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

        <path
          ref={pathRef}
          d={activePath}
          stroke="var(--primary-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ pointerEvents: 'none' }}
        />

        <g
          style={{
            transform: `translate(${dotPos.x}px, ${dotPos.y}px)`,
            transition: `transform ${currentStepMs}ms ease-in-out`,
            willChange: 'transform'
          }}
        >
          <image href={AsimImage.src} x={-12} y={-12} width={24} height={24} />
        </g>
      </svg>
    </div>
  )
}