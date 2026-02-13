import { RefObject, useRef } from 'react';

import { SidebarGestureOptions } from './sidebar.types';

export function useSidebarGesture(
  ref: RefObject<HTMLElement | null>,
  {
    isOpen,
    onClose,
    sidebarWidth,
    threshold = 50,
    enabled = true,
  }: SidebarGestureOptions
) {
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  const isMobile = () => window.innerWidth < 768;

  const onTouchStart = (e: React.TouchEvent) => {
    if (!enabled || !isOpen || !isMobile()) return;

    draggingRef.current = true;
    startXRef.current = e.touches[0].clientX;

    if (ref.current) {
      ref.current.style.transition = 'none';
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current || !ref.current) return;

    const diffX = e.touches[0].clientX - startXRef.current;

    // sadece sola çekmeye izin ver
    if (diffX >= 0) return;

    const clamped = Math.max(diffX, -sidebarWidth);
    ref.current.style.transform = `translateX(${clamped}px)`;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!draggingRef.current || !ref.current) return;

    draggingRef.current = false;

    const diffX = e.changedTouches[0].clientX - startXRef.current;

    ref.current.style.transition = '0.3s cubic-bezier(.22,.61,.36,1) transform';

    if (diffX < -threshold) {
      onClose();
    }
    ref.current.style.removeProperty('transform');
    ref.current.style.removeProperty('transition');
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
