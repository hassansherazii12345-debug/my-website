import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

/**
 * Page-wide floating ingredients that scroll with the page content.
 * These are positioned absolutely within the page flow (not fixed),
 * so they move when the user scrolls. They still have a gentle
 * floating CSS animation for liveliness.
 */
const PageFloatingIngredients = () => {
    const containerRef = useRef(null);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const numIngredients = isMobile ? 12 : 25;
    const types = ['pepperoni', 'mushroom', 'olive', 'basil'];

    // Use useMemo so positions are stable across renders
    const ingredients = useMemo(() => {
        return Array.from({ length: numIngredients }, (_, i) => {
            const side = i % 2;
            const type = types[(i + (side * 2)) % types.length];
            const baseSize = type === 'pepperoni' ? 18 : 26;
            const size = baseSize + Math.random() * 20;

            return {
                id: `page-ing-${i}`,
                type,
                size,
                speed: 0.015 + Math.random() * 0.03,
                side,
                // Spread across left and right edges of the page
                left: side === 0
                    ? (Math.random() * 30 + 2) + '%'
                    : (Math.random() * 30 + 68) + '%',
                // Spread across the full page height (0% to 100%)
                top: (i / numIngredients * 95 + Math.random() * 4) + '%',
                delay: Math.random() * -15,
                duration: 18 + Math.random() * 22,
            };
        });
    }, [numIngredients]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = containerRef.current?.querySelectorAll('.page-floating-item');
            if (!elements) return;

            const handleMovement = (mx, my) => {
                elements.forEach((el, i) => {
                    if (i >= ingredients.length) return;
                    const speed = ingredients[i].speed;
                    gsap.to(el, {
                        x: mx * speed * 600,
                        y: my * speed * 600,
                        duration: 2,
                        ease: 'power1.out',
                        overwrite: 'auto',
                    });
                });
            };

            const onMouseMove = (e) => {
                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;
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
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="#db3b31" stroke="#000" strokeWidth="5" />
                        <circle cx="35" cy="35" r="5" fill="#8b1a13" opacity="0.4" />
                        <circle cx="65" cy="45" r="7" fill="#8b1a13" opacity="0.4" />
                    </svg>
                );
            case 'mushroom':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <path d="M50 20 C30 20 20 40 20 55 C20 65 30 70 50 70 C70 70 80 65 80 55 C80 40 70 20 50 20 Z" fill="#fffcf0" stroke="#000" strokeWidth="5" />
                        <path d="M40 70 L40 85 C40 90 60 90 60 85 L60 70 Z" fill="#e8d8c8" stroke="#000" strokeWidth="5" />
                    </svg>
                );
            case 'olive':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="32" fill="#111" stroke="#000" strokeWidth="5" />
                        <circle cx="50" cy="50" r="10" fill="#333" />
                    </svg>
                );
            case 'basil':
                return (
                    <svg width={size} height={size} viewBox="0 0 100 100">
                        <path d="M50 80 C20 80 10 50 50 20 C90 50 80 80 50 80 Z" fill="#4a7c44" stroke="#000" strokeWidth="5" />
                        <path d="M50 80 L50 35" stroke="#000" strokeWidth="3" fill="none" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={containerRef}
            className="page-floating-ingredients"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {ingredients.map((ing) => (
                <div
                    key={ing.id}
                    className="page-floating-item float-animate"
                    style={{
                        position: 'absolute',
                        left: ing.left,
                        top: ing.top,
                        animationDelay: `${ing.delay}s`,
                        animationDuration: `${ing.duration}s`,
                        willChange: 'transform',
                        opacity: 0.5,
                    }}
                >
                    {renderIngredient(ing.type, ing.size)}
                </div>
            ))}
        </div>
    );
};

export default PageFloatingIngredients;
