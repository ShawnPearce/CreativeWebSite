import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import myImage from "../assets/dict.png";

gsap.registerPlugin(ScrollTrigger);

const killers = [
  {
    label: 'Surveillance',
    detail:
      'Hovering over people at work, making them feel constantly watched, undermines the motivation necessary for creativity.',
  },
  {
    label: 'Evaluation',
    detail:
      'Setting up expectations of critical, external evaluation creates anxiety that shifts focus from exploration to self-protection.',
  },
  {
    label: 'Over-control',
    detail:
      'Dictating exactly how work is done leaves employees feeling that any originality is a mistake waiting to be punished.',
  },
  {
    label: 'Competition',
    detail:
      'Putting people in win / lose situations for recognition forces them to stop sharing ideas, killing collaborative creativity.',
  },
  {
    label: 'Restricted Choice',
    detail:
      'Limiting people\'s sense of autonomy in how they approach their work constrains creative self-determination (Deci & Ryan, 2000).',
  },
];

export default function CreativityKillers() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the "strike-through" line across the heading
      gsap.fromTo(
        '.killer-strike',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger the killer items
      gsap.fromTo(
        '.killer-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.killer-list',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="killers-title"
      className="relative py-32 sm:py-40 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-red-300/70 font-medium">
            The Evidence
          </span>
          <h2
            id="killers-title"
            className="relative mt-4 inline-block text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #fecdd3 0%, #fca5a5 50%, #f87171 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How Creativity Gets Killed
            {/* Animated strike-through */}
            <span
              className="killer-strike absolute left-0 top-1/2 w-full h-[2px] bg-red-400/60 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </h2>
          <img src={myImage} alt="Villain" className="mt-6 mx-auto max-w-sm rounded-lg" />
          <TextReveal className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Amabile (1998) found that certain management practices can actually kill intrinsic motivation, which is one of the biggest factors behind creativity and good problem solving. When workplaces have too much control, strict evaluation standards, tight deadlines, and not enough freedom, employees start focusing more on just meeting expectations instead of actually thinking creatively. People stop exploring new ideas and just try to play it safe.
          </TextReveal>
        </div>

        {/* Killer list */}
        <div className="killer-list space-y-6">
          {killers.map((k, i) => (
            <motion.div
              key={k.label}
              tabIndex={0}
              className="killer-item group relative flex items-start gap-6 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-red-500/[0.04] hover:border-red-400/20 focus-visible:bg-red-500/[0.04] focus-visible:border-red-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40 transition-all duration-500"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Number */}
              <span
                className="flex-shrink-0 w-10 h-10 rounded-full border border-red-400/20 flex items-center justify-center text-sm font-medium text-red-300/70"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {i + 1}
              </span>

              <div>
                <h3 className="text-lg font-semibold text-white/80 mb-1 group-hover:text-red-200 transition-colors duration-300">
                  {k.label}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{k.detail}</p>
              </div>

              {/* Arrow indicator on hover */}
              <div className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400/40 self-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Attribution */}
        <p className="mt-12 text-center text-sm text-white/40 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
          Based on Amabile, T. M. (1998). How to kill creativity. <em>Harvard Business Review, 76</em>(5), 76–87.
        </p>
      </div>
    </section>
  );
}
