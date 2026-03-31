import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import '../styles/pizza.css';


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const PizzaAssembly = () => {
    const sectionRef = useRef(null);

    // Use useLayoutEffect for GSAP to ensure it runs before the browser paints
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Force an immediate refresh to lock in container heights
            ScrollTrigger.refresh();

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=800%', 
                    scrub: 1, 
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                }
            });

            // Set all initial states at the very first frame
            mainTl.set(sectionRef.current, { visibility: 'visible', opacity: 1 }, 0)
                .set('.pizza-box-scene', { xPercent: -50, yPercent: -50 }, 0)
                .set('.pizza-wrapper', { xPercent: 0, yPercent: 0, opacity: 1 }, 0)
                .set('.slice', { opacity: 0, x: 0, y: 0, force3D: true }, 0)
                .set(['.assembly-initial', '.assembly-final', '.assembly-delivery'], { opacity: 0, y: 30 }, 0)
                .set(['.base-floor', '.lid-top-face', '.lid-bottom-face', '.lid-flap'], { scale: 1, opacity: 0, force3D: true }, 0)
                .set('.scooter-scene', { opacity: 1, y: '-100vh', xPercent: -50, yPercent: -50 }, 0)
                .set('.tire-marks-container', { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, 0)
                .set('.bg-text-perfection', { x: '100vw', xPercent: 0, yPercent: -50, opacity: 1, force3D: true }, 0)
                .set('.box-lid-3d', { rotationX: -90, transformOrigin: '50% 0% 0px' }, 0)
                .set('.pizza-wrapper', { transformStyle: 'preserve-3d', force3D: true, scale: 1, y: 0 }, 0)
                .set('.pizza-container', { rotationX: 10, rotationY: -10, rotationZ: 0, force3D: true }, 0);

            // 1. SLICE ASSEMBLY (0 - 1.5) - SLOWED DOWN
            [1,2,3,4,5,6,7,8].forEach((i, idx) => {
                const config = [
                    { x: '-110vw', y: '-60vh', r: -240 },
                    { x: '90vw', y: '-90vh', r: 180 },
                    { x: '110vw', y: '-40vh', r: 135 },
                    { x: '100vw', y: '70vh', r: -90 },
                    { x: '50vw', y: '110vh', r: 200 },
                    { x: '-90vw', y: '100vh', r: -180 },
                    { x: '-110vw', y: '20vh', r: -45 },
                    { x: '-20vw', y: '-110vh', r: 90 }
                ][idx];
                mainTl.fromTo(`.slice-${i}`, 
                    { x: config.x, y: config.y, rotation: config.r, opacity: 0 }, 
                    { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.0, ease: 'power2.out', lazy: true }, 
                    idx * 0.15 // Increased stagger from 0.08
                );
            });

            // 2. TEXT ENTRANCE (1.2) - Delayed to match slower assembly
            mainTl.to('.assembly-initial', { opacity: 1, y: 0, duration: 0.8, lazy: true }, 1.2);

            // 3. ORIGINAL TEXT EXITS (2.5) - Pushed back
            mainTl.to('.assembly-initial p', { opacity: 0, duration: 1.0, lazy: true }, 2.5)
                .to('.assembly-initial h2', { x: '120vw', opacity: 0, duration: 1.2, ease: 'power2.in', lazy: true }, 2.7);
 
            // 3.5 BACKGROUND TEXT SCROLL (3.2 -> 6.7) - Pushed back
            mainTl.to('.bg-text-perfection', { x: '-100vw', xPercent: -100, duration: 3.5, ease: 'none', force3D: true, lazy: true }, 3.2);
 
            // 4. PIZZA SPIN & SHRINK (Phase 4 starts at 3.5) - Pushed back
            mainTl.to('.pizza-container', { rotation: 180, rotationX: 0, rotationY: 0, duration: 3.2, ease: 'power2.inOut', lazy: true }, 3.5)
                .to('.pizza-wrapper', { scale: 0.5, y: 0, duration: 3.2, ease: 'power2.inOut', lazy: true }, 3.5);

            // 5. BOX MATERIALIZATION (6.7)
            mainTl.to(['.base-floor', '.lid-top-face', '.lid-bottom-face', '.lid-flap'], { opacity: 1, duration: 1.0, ease: 'power2.out', lazy: true }, 6.7);

            // 7. PIZZA DROPS INTO BOX (7.7)
            mainTl.to('.pizza-wrapper', { z: -13, y: '1%', duration: 0.6, ease: 'bounce.out', lazy: true }, 7.7);

            // 8. LID COMPLETION
            mainTl.to('.box-lid-3d', { rotationX: 0, duration: 1.2, ease: 'bounce.out', lazy: true }, 8.3)
                .to('.pizza-wrapper', { opacity: 0, duration: 0.01, lazy: true }, 9.6)
                .to('.pizza-box-scene', { scale: 1.08, duration: 0.6, lazy: true }, 9.6);

            // 9. FINAL PACKING TEXT (8.4 onwards)
            mainTl.to('.assembly-final', { opacity: 1, y: 0, duration: 0.8, lazy: true }, 8.4)
                .to('.assembly-final p', { opacity: 0, duration: 1.0, lazy: true }, 10.6)
                .to('.assembly-final h2', { x: '120vw', opacity: 0, duration: 1.2, ease: 'power2.in', lazy: true }, 10.8);

            // 10. SCOOTER DRIVES IN & PIZZA BOX SHRINKS TO IT
            mainTl.to('.scooter-scene', { y: '0vh', duration: 2.0, ease: 'power2.out', lazy: true }, 11.6)
                .to('.pizza-box-scene', { 
                    scale: 0.22, 
                    y: '-10vh', 
                    duration: 2.0, 
                    ease: 'power2.inOut',
                    lazy: true 
                }, 11.6);

            // 11. TIRE MARKS - PHYSICAL TRAILING EFFECT (DELAYED TO STAY BEHIND WHEELS)
            // Initial state: perfectly hidden off top edge
            mainTl.set('.tire-marks-container', { opacity: 1, clipPath: 'inset(0 0 100% 0)' }, 11.6);
            
            mainTl.to('.tire-marks-container', { 
                clipPath: 'inset(0 0 38% 0)', // Reveal only the top 62% of the screen (behind wheels)
                duration: 1.8,  // Slightly slower than arrival to stay behind the front tire
                ease: 'power2.inOut' 
            }, 11.8) // Delayed start slightly relative to scooter (11.6 to 11.8)
            .to('.tire-mark-pattern', { 
                backgroundPositionY: '180px', 
                duration: 1.8, 
                ease: 'power2.inOut' 
            }, 11.8);
 
            // 12. CONTINUOUS ROLLING EFFECT
            mainTl.to('.tire-mark-pattern', { 
                backgroundPositionY: '800px', 
                duration: 2.5, 
                ease: 'none' 
            }, 13.6)
            .to('.assembly-delivery', { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                lazy: true 
            }, 13.6); 

            // 13. FINAL BOX FADE
            mainTl.to(['.base-floor', '.lid-top-face', '.lid-bottom-face', '.lid-flap'], { opacity: 0, duration: 0.2 }, 12.9);

        }, sectionRef);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);
        const timer = setTimeout(refresh, 1000);

        return () => {
            ctx.revert();
            window.removeEventListener('load', refresh);
            clearTimeout(timer);
        };
    }, []);



    return (
        <section className="assembly-section" ref={sectionRef}>

            {/* --- 3D Pizza Box Base --- */}
            <div className="pizza-box-scene pizza-box-base-scene">
                <div className="box-base-3d">
                    <div className="base-floor"></div>
                </div>
            </div>

            {/* Pizza Layer */}
            <div className="pizza-wrapper">
                <div className="pizza-container">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className={`slice slice-${i}`}></div>
                    ))}
                </div>
            </div>

            {/* --- 3D Pizza Box Lid --- */}
            <div className="pizza-box-scene pizza-box-lid-scene">
                <div className="box-lid-3d">
                    <div className="lid-top-face"></div>
                    <div className="lid-bottom-face"></div>
                    <div className="lid-flap lid-flap-left"></div>
                    <div className="lid-flap lid-flap-right"></div>
                </div>
            </div>

            {/* --- Scooter Delivery Scene --- */}
            <div className="tire-marks-container">
                <div className="tire-mark-main">
                    <div className="tire-mark-pattern"></div>
                </div>
            </div>
            <div className="scooter-scene">
                <div className="scooter-rotator">
                    <img src="/scooter.png" className="scooter-img" alt="Delivery Scooter" />
                </div>
            </div>



            {/* Background Moving Text */}
            <div className="bg-text-perfection">PERFECTION ASSEMBLED</div>
 
            {/* Original Assembly Text */}
            <div className="assembly-text assembly-initial">
                <h2 className="heading-md">PERFECTION ASSEMBLED</h2>
                <p>A symphony of flavor, crafted with passion.</p>
            </div>
            {/* Packing Text - Styled like initial text with red sub-line */}
            <div className="assembly-text assembly-final">
                <h2 className="heading-md">SEALED FRESH</h2>
                <p>READY TO IMPRESS</p>
            </div>
            {/* Delivery Success Text - Mirrors 'Sealed Fresh' behaviors */}
            <div className="assembly-text assembly-delivery">
                <h2 className="heading-md">DELIVERED AT SPEED</h2>
                <div style={{ marginTop: '2.5rem' }}>
                    <button className="btn-red">ORDER NOW</button>
                </div>
            </div>
        </section>
    );
};

export default PizzaAssembly;
