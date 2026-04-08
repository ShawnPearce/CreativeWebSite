import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const interventions = [
  {
    step: 'I',
    title: 'Redefine the Brief',
    body: 'Set clear strategic goals but leave the path open. Specify the "what" and "why," not the "how." Autonomy in process, not in mission, is the strongest predictor of creative output (Amabile, 1998).',
  },
  {
    step: 'II',
    title: 'Build Heterogeneous Teams',
    body: 'Assemble groups that differ in perspective, training, and thinking style. Cognitive diversity produces constructive friction that leads to more original solutions (Hennessey & Amabile, 2010).',
  },
  {
    step: 'III',
    title: 'Protect Incubation Time',
    body: 'Creativity demands periods of low-pressure exploration. Shield teams from artificial urgency and grant time for ideas to develop below the surface (Csikszentmihalyi, 1996).',
  },
  {
    step: 'IV',
    title: 'Model Psychological Safety',
    body: 'Leaders who publicly acknowledge uncertainty and reward intelligent failure create the conditions for risk-taking essential to innovation (Oldham & Cummings, 1996).',
  },
  {
    step: 'V',
    title: 'Align Feedback with Growth',
    body: 'Replace evaluative judgment with developmental feedback. Frame assessments around learning trajectories rather than final outputs to sustain intrinsic motivation (Deci & Ryan, 2000).',
  },
];

export default function Interventions() {
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

      // Timeline line draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );

      // Stagger intervention items
      gsap.fromTo(
        '.intervention-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="interventions-title" className="relative py-32 sm:py-40 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <span className="text-xs tracking-[0.3em] uppercase text-indigo-300/70 font-medium">
            From Research to Practice
          </span>
          <h2
            id="interventions-title"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Practical Interventions for Leaders
          </h2>
          <TextReveal className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Five evidence-based actions that organizational leaders can take today to cultivate creative capacity across their teams.
          </TextReveal>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative pl-12 sm:pl-16">
          {/* Animated vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px">
            <div className="timeline-line h-full w-full bg-gradient-to-b from-indigo-400/40 via-purple-400/30 to-indigo-400/10 origin-top" style={{ transform: 'scaleY(0)' }} />
          </div>

          <div className="space-y-10">
            {interventions.map((item) => (
              <motion.div
                key={item.step}
                className="intervention-item group relative"
                tabIndex={0}
                whileHover={{ x: 6 }}
                whileFocus={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-12 sm:-left-16 top-2 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-indigo-400/30 bg-ink-950/80 flex items-center justify-center group-hover:border-indigo-400/60 transition-colors duration-300">
                    <span
                      className="text-xs sm:text-sm font-semibold text-indigo-300/70"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:bg-indigo-500/[0.04] group-hover:border-indigo-400/15 group-focus-visible:bg-indigo-500/[0.04] group-focus-visible:border-indigo-400/15 group-focus-visible:ring-2 group-focus-visible:ring-indigo-400/40 group-focus-visible:outline-none transition-all duration-500">
                  <h3
                    className="text-lg font-semibold text-white/85 mb-2 group-hover:text-indigo-200 transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
