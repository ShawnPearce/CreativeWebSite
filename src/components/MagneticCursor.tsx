import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over a magnetic element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const magnetic = el?.closest('[data-magnetic]') as HTMLElement | null;

      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const mx = rect.left + rect.width / 2;
        const my = rect.top + rect.height / 2;
        const dx = e.clientX - mx;
        const dy = e.clientY - my;

        magnetic.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
        magnetic.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';

        if (cursorRef.current) {
          cursorRef.current.style.width = '48px';
          cursorRef.current.style.height = '48px';
          cursorRef.current.style.borderColor = 'rgba(168, 132, 252, 0.5)';
        }
        if (glowRef.current) {
          glowRef.current.style.width = '80px';
          glowRef.current.style.height = '80px';
        }
      } else {
        if (cursorRef.current) {
          cursorRef.current.style.width = '20px';
          cursorRef.current.style.height = '20px';
          cursorRef.current.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        }
        if (glowRef.current) {
          glowRef.current.style.width = '40px';
          glowRef.current.style.height = '40px';
        }
      }
    };

    const handleMouseLeaveElement = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const magnetic = el?.closest('[data-magnetic]') as HTMLElement | null;
      if (magnetic) {
        magnetic.style.transform = '';
      }
    };

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${pos.current.x}px`;
        glowRef.current.style.top = `${pos.current.y}px`;
      }

      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveElement, true);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveElement, true);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Glow blob */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 40,
          height: 40,
          background: 'radial-gradient(circle, rgba(168,132,252,0.12) 0%, transparent 70%)',
          transition: 'width 0.3s, height 0.3s',
          left: -100,
          top: -100,
        }}
      />
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: 20,
          height: 20,
          borderColor: 'rgba(255, 255, 255, 0.25)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
          left: -100,
          top: -100,
        }}
      />
    </>
  );
}
