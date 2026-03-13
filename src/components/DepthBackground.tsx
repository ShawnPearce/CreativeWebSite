import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Multi-layer depth background with:
 * - Floating geometric shapes at different parallax speeds
 * - Morphing gradient that shifts hue based on scroll position
 * - Subtle noise/grain overlay for texture
 */
export default function DepthBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax layers at different speeds
      gsap.utils.toArray<HTMLElement>('.depth-layer').forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed || '0.1');
        gsap.to(layer, {
          y: () => window.innerHeight * speed * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });

      // Morphing gradient — shift hue as user scrolls
      gsap.to('.morph-gradient', {
        '--morph-hue': 360,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // Slow rotation on floating shapes
      gsap.utils.toArray<HTMLElement>('.depth-shape').forEach((shape, i) => {
        gsap.to(shape, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 80 + i * 20,
          repeat: -1,
          ease: 'none',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Morphing gradient overlay */}
      <div
        className="morph-gradient absolute inset-0"
        style={{
          '--morph-hue': 0,
          background: `
            radial-gradient(ellipse 1000px 800px at 25% 15%,
              hsla(calc(250 + var(--morph-hue, 0) * 0.15), 55%, 45%, 0.14), transparent 60%),
            radial-gradient(ellipse 800px 600px at 75% 25%,
              hsla(calc(180 + var(--morph-hue, 0) * 0.1), 50%, 40%, 0.1), transparent 55%),
            radial-gradient(ellipse 900px 700px at 50% 75%,
              hsla(calc(280 + var(--morph-hue, 0) * 0.12), 55%, 35%, 0.1), transparent 60%)
          `,
        } as React.CSSProperties}
      />

      {/* Depth layer 1 — far back, slow */}
      <div className="depth-layer absolute inset-0" data-speed="0.05">
        <div className="depth-shape absolute top-[10%] left-[15%] w-64 h-64 rounded-full border border-white/[0.03]" />
        <div className="depth-shape absolute top-[60%] right-[10%] w-48 h-48 rounded-full border border-purple-400/[0.04]" />
        <div className="depth-shape absolute top-[35%] right-[30%] w-32 h-32 rotate-45 border border-white/[0.02]" />
      </div>

      {/* Depth layer 2 — mid, medium speed */}
      <div className="depth-layer absolute inset-0" data-speed="0.15">
        <div className="depth-shape absolute top-[20%] right-[20%] w-40 h-40 rounded-full border border-indigo-400/[0.05]" />
        <div className="depth-shape absolute top-[70%] left-[25%] w-24 h-24 rotate-12 border border-teal-400/[0.04]" />
        <div className="depth-shape absolute top-[45%] left-[60%] w-56 h-56 rounded-full border border-purple-300/[0.03]" />
      </div>

      {/* Depth layer 3 — near, faster parallax */}
      <div className="depth-layer absolute inset-0" data-speed="0.3">
        <div className="absolute top-[15%] left-[45%] w-2 h-2 rounded-full bg-purple-400/20" />
        <div className="absolute top-[40%] left-[10%] w-1.5 h-1.5 rounded-full bg-indigo-400/15" />
        <div className="absolute top-[55%] right-[15%] w-1 h-1 rounded-full bg-teal-300/20" />
        <div className="absolute top-[80%] left-[35%] w-2 h-2 rounded-full bg-purple-300/15" />
        <div className="absolute top-[25%] right-[40%] w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="absolute top-[65%] left-[55%] w-1 h-1 rounded-full bg-indigo-300/20" />
      </div>

      {/* Noise/grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
