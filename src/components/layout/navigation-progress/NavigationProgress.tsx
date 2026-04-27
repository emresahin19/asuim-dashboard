'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import type { SpinnerName } from '@/components/ui/spinner/spinner.types'
import styles from './navigation-progress.module.scss'

type OverlayVariant = 'fullscreen' | 'app-content'

type SpinnerConfig = {
  name: SpinnerName
  variant: OverlayVariant
}

const variants = [
  "dots",
  "dots2",
  "dots3",
  "dots4",
  "dots5",
  "dots6",
  "dots7",
  "dots8",
  "dots9",
  "dots10",
  "dots11",
  "dots12",
  "dots13",
  "dots14",
  "dots8Bit",
  "dotsCircle",
  "sand",
  "line",
  "line2",
  "rollingLine",
  "pipe",
  "simpleDots",
  "simpleDotsScrolling",
  "star",
  "star2",
  "flip",
  "hamburger",
  "growVertical",
  "growHorizontal",
  "balloon",
  "balloon2",
  "noise",
  "bounce",
  "boxBounce",
  "boxBounce2",
  "triangle",
  "binary",
  "arc",
  "circle",
  "squareCorners",
  "circleQuarters",
  "circleHalves",
  "squish",
  "toggle",
  "toggle2",
  "toggle3",
  "toggle4",
  "toggle5",
  "toggle6",
  "toggle7",
  "toggle8",
  "toggle9",
  "toggle10",
  "toggle11",
  "toggle12",
  "toggle13",
  "point",
  "aesthetic"
]

function getConfig(targetPath: string): SpinnerConfig {
  const randomVariant = variants[Math.floor(Math.random() * variants.length)] as SpinnerName
  if (targetPath.startsWith('/auth')) {
    return { name: randomVariant, variant: 'fullscreen' }
  }
  if (targetPath.startsWith('/onboarding')) {
    return { name: randomVariant, variant: 'fullscreen' }
  }
  if (targetPath.startsWith('/app')) {
    return { name: randomVariant, variant: 'app-content' }
  }
  if (/^\/apps\/[^/]+/.test(targetPath)) {
    return { name: randomVariant, variant: 'app-content' }
  }
  return { name: randomVariant, variant: 'fullscreen' }
}

export function NavigationProgress() {
  const [target, setTarget] = useState<string | null>(null)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setTarget(null)
      prevPathname.current = pathname
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const link = (e.target as HTMLElement).closest('a')
      if (!link?.href) return

      try {
        const url = new URL(link.href, window.location.href)
        if (url.origin !== window.location.origin) return
        if (link.target === '_blank') return
        if (link.hasAttribute('download')) return
        if (url.pathname === pathname) return

        setTarget(url.pathname)

        // Safety fallback: clear after 10s
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setTarget(null), 10_000)
      } catch {
        // ignore invalid URLs
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [pathname])

  if (!target) return null

  const { name, variant } = getConfig(target)

  return (
    <div className={styles[variant]}>
      <Spinner name={name} size={24} />
    </div>
  )
}
