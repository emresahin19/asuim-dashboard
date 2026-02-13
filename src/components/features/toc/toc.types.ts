import { TocTokens } from "@/types"

export type TocItem = {
    id: string
    label: string
    depth: number
}

export type TocProps = {
  containerRef: React.RefObject<HTMLElement | null>
  activeIndex: number
  tokens?: Partial<TocTokens>
}

export interface PathSegment {
    offset: number
    top: number
    center: number
    bottom: number
}

export interface TocSvgData {
    path: string
    width: number
    height: number
    segments: PathSegment[]
}

export interface TocMeasuredItem {
    offset: number
    top: number
    center: number
    bottom: number
}

export type Waypoint = { x: number; y: number }