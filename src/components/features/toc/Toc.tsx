'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { TocProps, TocSvgData } from './toc.types'
import { TOKENS } from './toc.tokens'
import {
  buildPathFromWaypoints,
  buildRouteWaypoints,
  buildSvgPath,
  measureToc
} from './toc.utils'

import AsimImage from '@/assets/image/asimthecat-120x120.png'
import styles from './toc.module.scss'

export function Toc({ containerRef, activeIndex, tokens }: TocProps) {
  const prevActiveRef = useRef(activeIndex)
  const strokeColorRef = useRef('transparent')

  const [svg, setSvg] = useState<TocSvgData | null>(null)
  const [activePath, setActivePath] = useState('')
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })

  const pathRef = useRef<SVGPathElement>(null)
  const rafRef = useRef<number | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const runIdRef = useRef(0)

  const tokensWithDefaults = useMemo(
    () => ({ ...TOKENS, ...tokens }),
    [tokens]
  )

  const cancelAnimations = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    timeoutsRef.current.forEach(window.clearTimeout)
    timeoutsRef.current = []
    runIdRef.current += 1
    strokeColorRef.current = 'transparent'
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
    prevActiveRef.current = activeIndex
    cancelAnimations()

    const route = buildRouteWaypoints(svg.segments, fromIndex, activeIndex)
    if (!route.length) return

    const indexDiff = Math.abs(activeIndex - fromIndex)
    const drawDuration = Math.min(150 + indexDiff * 50, 450)
    const eraseDuration = 220
    const eraseDelay = 40

    const fullPath = buildPathFromWaypoints(route, tokensWithDefaults)
    setActivePath(fullPath)

    const myRunId = runIdRef.current

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        if (runIdRef.current !== myRunId) return

        const el = pathRef.current
        if (!el || !el.isConnected) return

        const d = el.getAttribute('d')
        if (!d) return 

        let length = -1
        try {
          length = el.getTotalLength()
        } catch {
          return
        }

        if (!isFinite(length) || length < 0) return

        el.style.transition = 'none'
        el.style.strokeDasharray = `${length} ${length}`
        el.style.strokeDashoffset = `${length}`
        el.getBoundingClientRect()

        el.style.transition = `stroke-dashoffset ${drawDuration}ms ease-in-out`
        el.style.strokeDashoffset = '0'
        strokeColorRef.current = 'var(--primary-500)'

        const start = performance.now()

        const animateDot = (now: number) => {
          if (runIdRef.current !== myRunId) return
          const el2 = pathRef.current
          if (!el2 || !el2.isConnected) return

          const d2 = el2.getAttribute('d')
          if (!d2) return

          const t = Math.min((now - start) / drawDuration, 1)

          try {
            const p = el2.getPointAtLength(t * length)
            setDotPos({ x: p.x, y: p.y })
          } catch {
            return
          }

          if (t < 1) rafRef.current = requestAnimationFrame(animateDot)
        }

        rafRef.current = requestAnimationFrame(animateDot)

        const tErase = window.setTimeout(() => {
          if (runIdRef.current !== myRunId) return
          const el3 = pathRef.current
          if (!el3 || !el3.isConnected) return

          el3.style.transition = `stroke-dashoffset ${eraseDuration}ms ease-in-out`
          el3.style.strokeDashoffset = `${-length}`

          const tClear = window.setTimeout(() => {
            if (runIdRef.current !== myRunId) return
            setActivePath('')
          }, eraseDuration + 50)

          timeoutsRef.current.push(tClear)
        }, drawDuration + eraseDelay)

        timeoutsRef.current.push(tErase)
      })
    })

    return () => cancelAnimations()
  }, [activeIndex, svg, tokensWithDefaults, cancelAnimations])

  return (
    svg && (
      <div className={styles.container}>
        <svg
          className={styles.svg}
          width={svg.width}
          height={svg.height}
        >
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
            stroke={strokeColorRef.current}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ pointerEvents: 'none' }}
          />

          <g
            style={{
              transform: `translate(${dotPos.x}px, ${dotPos.y}px)`,
              willChange: 'transform'
            }}
          >
            <image
              href={AsimImage.src}
              x={-12}
              y={-12}
              width={24}
              height={24}
            />
          </g>
        </svg>
      </div>
    )
  )
}