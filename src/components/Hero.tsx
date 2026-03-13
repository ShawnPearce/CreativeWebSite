import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax fade-out as user scrolls past the hero
      gsap.to(titleRef.current, {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '80% top',
          scrub: true,
        },
      });

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '5% top',
          end: '20% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.6 + i * 0.04,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const title = 'Motivating Creativity';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-400/[0.06] blur-[100px] pointer-events-none" />

      {/* Overline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-purple-300/80 font-medium">
          Creative Leadership &middot; Academic Research
        </span>
      </motion.div>

      {/* Title with per-letter animation */}
      <h1
        id="hero-title"
        ref={titleRef}
        className="text-center leading-[1.05] font-bold tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif", perspective: '800px' }}
      >
        <span className="sr-only">{title}</span>
        <span aria-hidden="true" className="flex flex-wrap justify-center">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${
                char === ' ' ? 'w-[0.3em]' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #e2e0ff 0%, #c4b5fd 40%, #7dd3fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </h1>

      {/* Subtitle */}
      <motion.p
        ref={subtitleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="mt-8 max-w-2xl text-center text-lg sm:text-xl text-white/70 leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <em style={{ fontFamily: "'Playfair Display', serif" }}>
          &ldquo;Keep doing what you&rsquo;re doing. Or, if you want to spark innovation, rethink
          how you motivate, reward, and assign work to people.&rdquo;
        </em>
        <br />
        <span className="text-sm text-white/55 mt-2 inline-block">
          &mdash; Teresa M. Amabile, <em>Harvard Business Review</em> (1998)
        </span>
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 h-px w-32 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent origin-center"
      />

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-xs tracking-widest uppercase text-white/50"
        >
          Scroll to explore
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 2.8 },
            y: { delay: 2.8, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          data-magnetic
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
