import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingIngredients = () => {
    const containerRef = useRef(null);

    // Performance: Lower count on mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const numIngredients = isMobile ? 8 : 15; 
    const types = ['pepperoni', 'mushroom', 'olive', 'basil'];

    const ingredients = Array.from({ length: numIngredients }, (_, i) => {
        const side = i % 2;
        const type = types[(i + (side * 2)) % types.length];
        const baseSize = type === 'pepperoni' ? 20 : 30;
        const size = baseSize + Math.random() * 25;

        return {
            id: i,
            type,
            size,
            speed: 0.02 + Math.random() * 0.04, // Slower for smoother feel
            side,
            left: side ===
             0 ? (Math.random() * 35 + 2) + '%' : (Math.random() * 35 + 63) + '%',
            top: (Math.random() * 90 + 5) + '%',
            delay: Math.random() * -10, // Random start point for CSS animation
            duration: 15 + Math.random() * 20
        };
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current.querySelectorAll('.floating-item');

            // Only use GSAP for the interactive parallax (optimized)
            const handleMovement = (mx, my) => {
                elements.forEach((el, i) => {
                    if (i >= ingredients.length) return;
                    const speed = ingredients[i].speed;
                    // Lower intensity for better performance
                    gsap.to(el, {
                        x: mx * speed * 800,
                        y: my * speed * 800,
                        duration: 1.5,
                        ease: 'power1.out',
                        overwrite: 'auto'
                    });
                });
            };

            const onMouseMove = (e) => {
                const x = (e.clientX / window.innerWidth - 0.5);
                const y = (e.clientY / window.innerHeight - 0.5);
                requestAnimationFrame(() => handleMovement(x, y));
            };

            const onDeviceMove = (e) => {
                if (e.beta && e.gamma) {
                    const x = e.gamma / 45;
                    const y = e.beta / 45;
                    requestAnimationFrame(() => handleMovement(x, y));
                }
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('deviceorientation', onDeviceMove);

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('deviceorientation', onDeviceMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, [ingredients]);

    const renderIngredient = (type, size) => {
        switch (type) {
            case 'pepperoni':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Fresh Pepperoni - Greg's Pizza Ingredients">
                        <circle cx="50" cy="50" r="45" fill="#db3b31" stroke="#000" strokeWidth="5" />
                        <circle cx="35" cy="35" r="5" fill="#8b1a13" opacity="0.4" />
                        <circle cx="65" cy="45" r="7" fill="#8b1a13" opacity="0.4" />
                    </svg>
                );
            case 'mushroom':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Fresh Mushroom - Greg's Pizza Ingredients">
                        <path d="M50 20 C30 20 20 40 20 55 C20 65 30 70 50 70 C70 70 80 65 80 55 C80 40 70 20 50 20 Z" fill="#fffcf0" stroke="#000" strokeWidth="5" />
                        <path d="M40 70 L40 85 C40 90 60 90 60 85 L60 70 Z" fill="#e8d8c8" stroke="#000" strokeWidth="5" />
                    </svg>
                );
            case 'olive':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Black Olive - Greg's Pizza Ingredients">
                        <circle cx="50" cy="50" r="32" fill="#111" stroke="#000" strokeWidth="5" />
                        <circle cx="50" cy="50" r="10" fill="#333" />
                    </svg>
                );
            case 'basil':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Fresh Basil - Greg's Pizza Ingredients">
                        <path d="M50 80 C20 80 10 50 50 20 C90 50 80 80 50 80 Z" fill="#4a7c44" stroke="#000" strokeWidth="5" />
                        <path d="M50 80 L50 35" stroke="#000" strokeWidth="3" fill="none" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
            {ingredients.map((ing) => (
                <div 
                    key={ing.id} 
                    className="floating-item float-animate" 
                    style={{ 
                        position: 'absolute',
                        left: ing.left,
                        top: ing.top,
                        animationDelay: `${ing.delay}s`,
                        animationDuration: `${ing.duration}s`,
                        willChange: 'transform',
                        opacity: 0.7
                    }}
                >
                    {renderIngredient(ing.type, ing.size)}
                </div>
            ))}
        </div>
    );
};

export default FloatingIngredients;
