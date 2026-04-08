import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const conditions = [
  {
    title: 'Autonomy',
    body: 'Giving people freedom in how they approach their work, not in defining the goals, but in the process, heightens intrinsic motivation and creative engagement (Deci & Ryan, 2000).',
    icon: '01',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    accentBorder: 'group-hover:border-emerald-400/30',
    accentText: 'text-emerald-300/70',
  },
  {
    title: 'Challenge & Matching',
    body: 'Matching people to assignments that stretch their abilities without overwhelming them creates the optimal arousal for creative flow states (Csikszentmihalyi, 1996).',
    icon: '02',
    gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
    accentBorder: 'group-hover:border-sky-400/30',
    accentText: 'text-sky-300/70',
  },
  {
    title: 'Resources & Time',
    body: 'Creativity requires incubation. Insufficient time produces pressure that kills exploration. Sufficient (not excess) resources signal organizational commitment (Amabile, 1998).',
    icon: '03',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    accentBorder: 'group-hover:border-violet-400/30',
    accentText: 'text-violet-300/70',
  },
  {
    title: 'Supportive Supervision',
    body: 'Leaders who serve as role models, communicate effectively, and protect teams from political distractions foster psychological safety for risk-taking (Oldham & Cummings, 1996).',
    icon: '04',
    gradient: 'from-rose-500/20 via-rose-500/5 to-transparent',
    accentBorder: 'group-hover:border-rose-400/30',
    accentText: 'text-rose-300/70',
  },
  {
    title: 'Diverse Work Groups',
    body: 'Teams composed of members with varied perspectives, backgrounds, and thinking styles generate ideas that are both more novel and more useful (Hennessey & Amabile, 2010).',
    icon: '05',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    accentBorder: 'group-hover:border-amber-400/30',
    accentText: 'text-amber-300/70',
  },
];

export default function SupportingConditions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.condition-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.condition-grid',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="conditions-title" className="relative py-32 sm:py-40 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-300/70 font-medium">
            Evidence-Based Conditions
          </span>
          <h2
            id="conditions-title"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Conditions That Support Creativity
          </h2>
          <TextReveal className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Research points to five organizational conditions that reliably enhance creative output across domains and cultures.
          </TextReveal>
        </div>

        {/* Condition cards — asymmetric grid */}
        <div className="condition-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {conditions.map((c, i) => (
            <TiltCard
              key={c.title}
              className={i === conditions.length - 1 ? 'md:col-span-2 md:max-w-[calc(50%-0.625rem)] md:mx-auto' : ''}
            >
              <div
                tabIndex={0}
                className={`condition-card group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br ${c.gradient} backdrop-blur-sm p-8 transition-shadow duration-500 hover:shadow-glow focus-visible:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 ${c.accentBorder} h-full`}
              >
                {/* Number badge */}
                <span
                  className={`inline-block text-3xl font-bold ${c.accentText} mb-4 opacity-60`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {c.icon}
                </span>

                <h3
                  className="text-xl font-semibold text-white/85 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {c.title}
                </h3>

                <p className="text-sm text-white/60 leading-relaxed">
                  {c.body}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
