import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const components = [
  {
    title: 'Expertise',
    description:
      'The foundation of creative work — technical, procedural, and intellectual knowledge in a given domain (Amabile, 1998).',
    color: 'from-blue-400/20 to-cyan-400/20',
    border: 'border-blue-400/30',
    accent: 'text-blue-300',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M14 26l6-16 6 16M16 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Creative Thinking',
    description:
      'The capacity to put existing ideas together in new combinations — influenced by personality, cognitive style, and a willingness to take risks (Amabile, 1996).',
    color: 'from-purple-400/20 to-fuchsia-400/20',
    border: 'border-purple-400/30',
    accent: 'text-purple-300',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M15 25c0-6 5-5 5-11M20 14c0 6 5 5 5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Intrinsic Motivation',
    description:
      'The inner drive to engage in work for its own sake — the most powerful lever managers can influence (Deci & Ryan, 2000; Amabile, 1998).',
    color: 'from-amber-400/20 to-orange-400/20',
    border: 'border-amber-400/30',
    accent: 'text-amber-300',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M20 12v8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function ThreeComponents() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Pin this section briefly while cards animate in
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="three-components-title"
      className="relative py-32 sm:py-40 px-6"
    >
      {/* Section heading */}
      <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-20 opacity-0">
        <span className="text-xs tracking-[0.3em] uppercase text-purple-300/80 font-medium">
          Amabile&rsquo;s Componential Theory
        </span>
        <h2
          id="three-components-title"
          className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #e2e0ff 0%, #c4b5fd 50%, #7dd3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Three Components of Creativity
        </h2>
        <TextReveal className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
          Amabile (1996) proposed that creativity arises at the intersection of three within-individual components — each necessary, none alone sufficient.
        </TextReveal>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {components.map((comp, i) => (
          <TiltCard key={comp.title}>
            <motion.div
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              tabIndex={0}
              className={`group relative rounded-2xl border ${comp.border} bg-gradient-to-b ${comp.color} backdrop-blur-sm p-8 transition-shadow duration-500 hover:shadow-glow focus-visible:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`${comp.accent} mb-6`}>{comp.icon}</div>

              <h3
                className="text-xl font-semibold text-white/90 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {comp.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed">
                {comp.description}
              </p>

              {/* Decorative bottom line */}
              <div
                className={`mt-6 h-px w-12 bg-gradient-to-r ${comp.color} opacity-50 group-hover:w-full transition-all duration-700`}
              />
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Connecting annotation */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 text-center text-sm text-white/45 italic max-w-lg mx-auto"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        &ldquo;Creativity is the confluence of intrinsic motivation, domain-relevant skills, and
        creativity-relevant processes.&rdquo;
        <br />
        <span className="not-italic text-white/40">&mdash; Amabile (1996, p. 83)</span>
      </motion.p>
    </section>
  );
}
