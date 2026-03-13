import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
  { id: 'hero-title', label: 'Introduction' },
  { id: 'three-components-title', label: 'Three Components' },
  { id: 'killers-title', label: 'Creativity Killers' },
  { id: 'conditions-title', label: 'Supporting Conditions' },
  { id: 'interventions-title', label: 'Interventions' },
  { id: 'references-title', label: 'References' },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top) {
            setActiveIndex(i);
            return;
          }
        }
      }
      setActiveIndex(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #818cf8, #c084fc, #7dd3fc)',
        }}
      />

      {/* Side navigation dots */}
      <nav
        aria-label="Page sections"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4"
      >
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            aria-label={`Jump to ${s.label}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            {/* Label on hover */}
            <span className="text-[11px] tracking-wide text-white/0 group-hover:text-white/60 transition-all duration-300 whitespace-nowrap translate-x-2 group-hover:translate-x-0">
              {s.label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-3 h-3 bg-purple-400 shadow-[0_0_8px_rgba(168,132,252,0.5)]'
                  : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
