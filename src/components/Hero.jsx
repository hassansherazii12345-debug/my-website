import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingIngredients from './FloatingIngredients';
import '../styles/pizza.css';

const Hero = () => {
    const heroRef = useRef(null);
    const videoRef = useRef(null);

    // Robust autoplay logic with metadata handling
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Force muted state for browser autoplay compliance
            video.muted = true;
            video.defaultMuted = true;

            const handlePlay = () => {
                video.play().then(() => {
                    // Refresh GSAP markers once video layout is actually active
                    ScrollTrigger.refresh();
                }).catch(error => {
                    console.log("Autoplay blocked, waiting for interaction:", error);
                    
                    const handleInteraction = () => {
                        video.play().finally(() => {
                            ScrollTrigger.refresh();
                            window.removeEventListener('touchstart', handleInteraction);
                            window.removeEventListener('click', handleInteraction);
                        });
                    };
                    window.addEventListener('touchstart', handleInteraction);
                    window.addEventListener('click', handleInteraction);
                });
            };

            // Attempt play immediately
            handlePlay();

            // Also trigger on metadata/canplay for better stability
            video.addEventListener('loadedmetadata', () => {
                handlePlay();
                ScrollTrigger.refresh();
            });
            video.addEventListener('canplay', () => {
                ScrollTrigger.refresh();
            });

            return () => {
                video.removeEventListener('loadedmetadata', handlePlay);
                video.removeEventListener('canplay', handlePlay);
            };
        }
    }, []);

    // GSAP hero entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.hero-title-wrapper', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.5
            });
            gsap.to('.hero-bg-accent', {
                opacity: 0.2, // Subtle fade in
                duration: 1.5,
                stagger: 0.3
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="home" className="hero-section" ref={heroRef}>
            <FloatingIngredients />

            <div className="hero-video-container-full">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    defaultMuted
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload noplaybackrate"
                    className="hero-video-full"
                    style={{ background: '#000', objectFit: 'cover' }}
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="container hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div className="hero-text-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="hero-title-wrapper mt-4">
                        <h1 className="hero-title-line heading-lg text-white font-bold text-shadow-strong">GREG'S PIZZA ROUTE 38</h1>
                    </div>
                    <div className="hero-buttons hero-title-wrapper mt-4">
                        <a href="https://www.gregspizzaroute38ma.com/#menu" className="btn-red" style={{ textDecoration: 'none' }}>
                            START ORDER
                        </a>
                        <a href="https://www.gregspizzaroute38ma.com/#menu" className="btn-red" style={{ textDecoration: 'none' }}>
                            VIEW MENU
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-bg-accent glow-red rotate-bg-slow"></div>
            <div className="hero-bg-accent glow-gold rotate-bg-slow" style={{ animationDirection: 'reverse' }}></div>
        </section>
    );
};

export default Hero;
