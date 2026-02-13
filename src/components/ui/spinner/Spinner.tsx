'use client'

import { useEffect, useMemo, useState } from 'react'
import { spinnerMap, SpinnerName } from './spinner.data'

import { clsx } from '@/utils'

import styles from './spinner.module.scss'

type SpinnerProps = {
    name?: SpinnerName
    size?: number
    color?: string
    speedMultiplier?: number
    className?: string
}

export function Spinner({
    name = 'dots',
    size = 16,
    color = 'currentColor',
    speedMultiplier = 1,
    className,
}: SpinnerProps) {
    const spinner = spinnerMap[name]

    const interval = useMemo(() => {
        return Math.max(16, spinner.interval / speedMultiplier)
    }, [spinner.interval, speedMultiplier])

    const [frameIndex, setFrameIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setFrameIndex((i) => (i + 1) % spinner.frames.length)
        }, interval)

        return () => clearInterval(id)
    }, [interval, spinner.frames.length])

    return (
        <span
            className={clsx(styles.root, className)}
            style={{
                fontSize: size,
                color,
                lineHeight: 1,
            }}
            aria-hidden
        >
            {spinner.frames[frameIndex]}
        </span>
    )
}
