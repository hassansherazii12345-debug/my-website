import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PizzaAssembly from './components/PizzaAssembly';
import PageFloatingIngredients from './components/PageFloatingIngredients';

import Contact from './components/Contact';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    // Initial refresh to ensure all starting positions are correct
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    // Detect Mobile/Tablet to disable heavy smooth scroll
    const isMobile = window.innerWidth <= 1024;

    if (!isMobile) {
      // Initialize Lenis Smooth Scrolling (Desktop Only)
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Bridge Lenis scroll events to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP ticker
      const updateLenis = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      // Final refresh after Lenis is up
      ScrollTrigger.refresh();

      return () => {
        lenis.destroy();
        gsap.ticker.remove(updateLenis);
      };
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // The gold standard for fixing layout shifts:
    // Watch for ANY size change in the main content (images loading, widgets appearing)
    // and tell GSAP to recalculate everything immediately.
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(mainRef.current);
    
    // Also refresh on window load just in case
    window.addEventListener('load', () => ScrollTrigger.refresh());

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {/* Global Background Layer */}
      <div id="bg-layer"></div>

      {/* Page-wide floating ingredients that scroll with content */}
      <PageFloatingIngredients />

      <Navbar />
      <main ref={mainRef}>
        <Hero />
        <section className="hero-subtitle-bar">
          <div className="container">
            <p className="subtitle-text">A cinematic Experience from Greg's Pizza</p>
            <div className="scroll-indicator-v2 bounce-anim">
                <p>Scroll to Explore</p>
                <ChevronDown size={20} color="#FFB800" />
            </div>
          </div>
        </section>
        <PizzaAssembly />

      </main>
      <Contact />
    </div>
  );
}

export default App;
