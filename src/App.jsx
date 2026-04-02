import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Quick Flash-Blur Transition Bridge
  useEffect(() => {
    window.scrollToSection = (sectionId) => {
      setIsTransitioning(true);
      
      // Total duration is ultra-quick (300ms)
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        
        // Clear blur almost instantly after jump
        setTimeout(() => {
          setIsTransitioning(false);
          ScrollTrigger.refresh();
        }, 100);
      }, 150);
    };
  }, []);

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
    <div className={`app-container ${isTransitioning ? 'global-blur' : ''}`} style={{ position: 'relative', transition: 'filter 0.25s ease-out' }}>
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
      
      {/* High-speed flash overlay to mask the jump */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(30px)', opacity: isTransitioning ? 1 : 0, transition: 'opacity 0.2s ease-in-out', pointerEvents: 'none', zIndex: 3000 }}></div>
    </div>
  );
}

export default App;
