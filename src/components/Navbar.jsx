import React, { useEffect, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { gsap } from 'gsap';
import MeltedCheeseTitle from './MeltedCheeseTitle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToTop = (e) => {
        e.preventDefault();
        if (window.scrollToSection) {
            // Jump directly to the top of the page without scroll animations
            window.scrollToSection('#home', true);
        } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
        setIsMenuOpen(false);
    };

    const scrollToAbout = (e) => {
        e.preventDefault();
        if (window.scrollToSection) {
            // Jump directly to the start of the footer section
            window.scrollToSection('#contact', true);
        } else {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        gsap.fromTo('.nav-brand', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, delay: 0.2 });
        gsap.fromTo('.nav-item', { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.4 });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container nav-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
                <div className="nav-left" style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
                    <div className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Increased to 75px (+25% from 60px) */}
                        <MeltedCheeseTitle style={{ width: '125px', height: 'auto', transformOrigin: 'left center' }} />
                    </div>
                </div>

                <div className="nav-order-ahead nav-item" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <a href="https://www.gregspizzaroute38ma.com/#menu" target="_blank" rel="noopener noreferrer" className="order-ahead-badge" style={{ textDecoration: 'none' }}>ORDER AHEAD</a>
                </div>

                <div className="nav-right" style={{ display: 'flex', justifyContent: 'flex-end', width: '25%' }}>
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="cart-btn hamburger-icon" 
                        aria-label="Open Menu" 
                        style={{ 
                            background: 'rgba(255, 255, 255, 0.1)', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            cursor: 'pointer', 
                            padding: '8px 12px', 
                            borderRadius: '30px',
                            display: 'flex', 
                            alignItems: 'center',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(219, 59, 49, 0.8)'; e.currentTarget.style.borderColor = 'rgba(219, 59, 49, 1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                    >
                        <MenuIcon size={24} color="#ffffff" style={{ pointerEvents: 'none' }} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`mobile-menu-wrapper ${isMenuOpen ? 'open' : ''}`} style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: isMenuOpen ? 'auto' : 'none',
                zIndex: 2000,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                {/* Overlay Backdrop */}
                <div 
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        background: 'rgba(0, 0, 0, 0.75)', 
                        backdropFilter: 'blur(15px)',
                        opacity: isMenuOpen ? 1 : 0,
                        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }} 
                />

                {/* Sidebar Drawer */}
                <div className="mobile-menu-drawer" style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(15,15,18,0.98) 0%, rgba(5,5,8,0.98) 100%)',
                    borderLeft: '1px solid rgba(255,255,255,0.03)',
                    padding: '4rem 3rem',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isMenuOpen ? '-30px 0 80px rgba(0,0,0,0.9)' : 'none'
                }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5rem', opacity: isMenuOpen ? 1 : 0, transition: 'opacity 1.5s ease 0.4s' }}>
                        <MeltedCheeseTitle style={{ width: '160px', height: 'auto', transformOrigin: 'left center' }} />
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            style={{ 
                                background: 'transparent', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                padding: '12px', 
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                        >
                            <X size={24} color="#ffffff" style={{ pointerEvents: 'none', transition: 'color 0.8s ease' }} />
                        </button>
                    </div>

                    <div className="mobile-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', flexGrow: 1, marginTop: '2rem' }}>
                        {[
                            { label: 'HOME', action: scrollToTop },
                            { label: 'ORDER AHEAD', href: "https://www.gregspizzaroute38ma.com/#menu", isTargetBlank: true },
                            { label: 'VIEW MENU', href: "https://www.gregspizzaroute38ma.com/#menu", isTargetBlank: true },
                            { label: 'ABOUT US', action: scrollToAbout }
                        ].map((item, idx) => (
                            <a 
                                key={idx}
                                href={item.href || '#'} 
                                onClick={item.action ? item.action : undefined} 
                                target={item.isTargetBlank ? '_blank' : undefined} 
                                rel={item.isTargetBlank ? 'noopener noreferrer' : undefined}
                                className="mobile-nav-item"
                                style={{ 
                                    fontSize: '2.2rem', 
                                    fontWeight: '300', 
                                    fontFamily: 'var(--font-heading)',
                                    textTransform: 'uppercase', 
                                    color: '#fff', 
                                    letterSpacing: '4px',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    opacity: isMenuOpen ? 1 : 0,
                                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
                                    transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.15}s`,
                                    display: 'inline-block',
                                    width: 'fit-content'
                                }}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.color = 'var(--accent-gold)';
                                    e.currentTarget.style.letterSpacing = '8px';
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.letterSpacing = '4px';
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="mobile-menu-footer" style={{ 
                        marginTop: 'auto', 
                        borderTop: '1px solid rgba(255,255,255,0.05)', 
                        paddingTop: '2.5rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px',
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
                    }}>
                        <p style={{ color: 'var(--accent-gold)', fontWeight: '400', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>GREG'S PIZZA</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '1px', margin: 0 }}>Authentic • Fresh • Fast</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
