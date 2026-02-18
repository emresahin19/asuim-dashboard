import type { CSSProperties } from 'react'

import type { Palette, PrimaryColor, ThemeState } from '@/types'
import colorData from './theme.color-data.json'

type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
type ColorScaleName = Palette | PrimaryColor

type ThemeColorData = {
  shadeOrder: Shade[]
  colorScales: Record<ColorScaleName, Record<Shade, string>>
  black: string
  white: string
}

const data = colorData as ThemeColorData

export function getScaleColor(scale: ColorScaleName, shade: Shade): string {
  return data.colorScales[scale][shade]
}

export function getThemeColorVariables(theme: Pick<ThemeState, 'palette' | 'primary'>): Record<string, string> {
  const variables: Record<string, string> = {
    '--color-black': data.black,
    '--color-white': data.white,
  }

  for (const shade of data.shadeOrder) {
    variables[`--base-${shade}`] = getScaleColor(theme.palette, shade)
    variables[`--primary-${shade}`] = getScaleColor(theme.primary, shade)
  }

  return variables
}

export function getThemeColorStyle(theme: Pick<ThemeState, 'palette' | 'primary'>): CSSProperties {
  return getThemeColorVariables(theme) as CSSProperties
}

export function applyThemeColorVariables(
  target: HTMLElement,
  theme: Pick<ThemeState, 'palette' | 'primary'>
) {
  const variables = getThemeColorVariables(theme)

  for (const [name, value] of Object.entries(variables)) {
    if (target.style.getPropertyValue(name) !== value) {
      target.style.setProperty(name, value)
    }
  }
}

export function getThemeSwatchStyle(scale: ColorScaleName): CSSProperties {
  return {
    background: getScaleColor(scale, '200'),
    color: getScaleColor(scale, '800'),
  }
}
