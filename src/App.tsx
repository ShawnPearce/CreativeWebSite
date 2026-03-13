import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import './App.css';

import ImmersiveSpace from './components/ImmersiveSpace';
import MagneticCursor from './components/MagneticCursor';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import ThreeComponents from './components/ThreeComponents';
import CreativityKillers from './components/CreativityKillers';
import SupportingConditions from './components/SupportingConditions';
import Interventions from './components/Interventions';
import References from './components/References';
import Footer from './components/Footer';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ImmersiveSpace />
      <MagneticCursor />
      <ScrollProgress />

      <div className="smooth-scroll-wrapper">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>

        <main id="main-content">
          <Hero />

          <div className="section-divider" aria-hidden="true" />

          <ThreeComponents />

          <div className="section-divider" aria-hidden="true" />

          <CreativityKillers />

          <div className="section-divider" aria-hidden="true" />

          <SupportingConditions />

          <div className="section-divider" aria-hidden="true" />

          <Interventions />

          <div className="section-divider" aria-hidden="true" />

          <References />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
