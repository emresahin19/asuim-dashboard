// middleware.ts
import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Aşağıdaki yollar dışındaki tüm istekleri yakala:
     * 1. _next/static (statik dosyalar)
     * 2. _next/image (resim optimizasyon servisleri)
     * 3. favicon.ico (favicon dosyası)
     * 4. Tüm resim ve font uzantıları (png, jpg, svg, ttf, vb.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  const response = NextResponse.next();
  response.headers.set('x-device-type', viewport);

  return response;
}