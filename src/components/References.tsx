import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const references: { author: string; title: string; source: string }[] = [
  {
    author: 'Amabile, T. M. (1996).',
    title: 'Creativity in context: Update to the social psychology of creativity.',
    source: 'Westview Press.',
  },
  {
    author: 'Amabile, T. M. (1998).',
    title: 'How to kill creativity.',
    source: 'Harvard Business Review, 76(5), 76–87.',
  },
  {
    author: 'Csikszentmihalyi, M. (1996).',
    title: 'Creativity: Flow and the psychology of discovery and invention.',
    source: 'HarperCollins.',
  },
  {
    author: 'Deci, E. L., & Ryan, R. M. (2000).',
    title: 'The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior.',
    source: 'Psychological Inquiry, 11(4), 227–268.',
  },
  {
    author: 'Hennessey, B. A., & Amabile, T. M. (2010).',
    title: 'Creativity.',
    source: 'Annual Review of Psychology, 61, 569–598.',
  },
  {
    author: 'Oldham, G. R., & Cummings, A. (1996).',
    title: 'Employee creativity: Personal and contextual factors at work.',
    source: 'Academy of Management Journal, 39(3), 607–634.',
  },
];

export default function References() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.ref-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ref-list',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="references-title" className="relative py-32 sm:py-40 px-6">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <h2
            id="references-title"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/70"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            References
          </h2>
          <p className="mt-3 text-sm text-white/45">
            APA 
          </p>
        </div>

        {/* Reference list */}
        <ol className="ref-list space-y-5 list-none">
          {references.map((ref, i) => (
            <li
              key={i}
              className="ref-item text-sm text-white/55 leading-relaxed pl-8 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-3 before:h-px before:bg-white/20"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {ref.author}{' '}
              <cite className="not-italic">{ref.title}</cite>{' '}
              <em>{ref.source}</em>
            </li>
          ))}
        </ol>

        {/* Bottom note */}
        <p className="mt-16 text-center text-xs text-white/40">
          All claims on this page are grounded in the peer-reviewed sources listed above.
        </p>
      </div>
    </section>
  );
}
