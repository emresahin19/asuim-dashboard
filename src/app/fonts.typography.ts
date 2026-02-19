import { clsx } from '@/utils'
import {
  Bayon,
  Bebas_Neue,
  Bona_Nova,
  DM_Sans,
  Manrope,
  Plus_Jakarta_Sans,
  Quicksand,
  Roboto_Serif,
} from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
})

const bonaNova = Bona_Nova({
  subsets: ['latin'],
  variable: '--font-bona-nova',
  display: 'swap',
  weight: ['400', '700'],
  preload: false,
})

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: false,
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
  weight: ['400'],
  preload: false,
})

const bayon = Bayon({
  subsets: ['latin'],
  variable: '--font-bayon',
  display: 'swap',
  weight: ['400'],
  preload: false,
})

export const typographyFontVariables = clsx(
  dmSans.variable,
  manrope.variable,
  plusJakartaSans.variable,
  quicksand.variable,
  bonaNova.variable,
  robotoSerif.variable,
  bebasNeue.variable,
  bayon.variable,
)