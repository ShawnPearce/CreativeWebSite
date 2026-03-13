import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'p' | 'span' | 'h2' | 'h3';
  stagger?: number;
  start?: string;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'p',
  stagger = 0.02,
  start = 'top 85%',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show all words immediately
      el.querySelectorAll('.word-reveal').forEach((w) => {
        (w as HTMLElement).style.opacity = '1';
        (w as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.word-reveal'),
        { opacity: 0.15, y: 8, filter: 'blur(2px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger,
          ease: 'power3.out',
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, stagger, start]);

  // Split text into words, preserving spaces
  const words = children.split(/(\s+)/);

  return (
    <Tag ref={containerRef as any} className={className}>
      {words.map((word, i) =>
        word.match(/^\s+$/) ? (
          <span key={i}>{' '}</span>
        ) : (
          <span
            key={i}
            className="word-reveal inline-block"
            style={{ opacity: 0.15 }}
          >
            {word}
          </span>
        )
      )}
    </Tag>
  );
}
