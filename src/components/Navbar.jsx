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
                    <span className="order-ahead-badge">ORDER AHEAD</span>
                </div>

                <div className="nav-right" style={{ display: 'flex', justifyContent: 'flex-end', width: '25%' }}>
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="cart-btn" 
                        aria-label="Open Menu" 
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
                    >
                        <MenuIcon size={24} color="#ffffff" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '300px',
                height: '100vh',
                background: '#000',
                zIndex: 2000,
                padding: '2rem',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
            }}>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    style={{ alignSelf: 'flex-end', marginBottom: '3rem' }}
                >
                    <X size={32} color="#ffffff" />
                </button>

                <div className="mobile-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <a href="#home" onClick={scrollToTop} style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', color: '#fff', letterSpacing: '2px' }}>HOME</a>
                    <a href="https://www.gregspizzaroute38ma.com/#menu" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', color: '#fff', letterSpacing: '2px' }}>ORDER</a>
                    <a href="https://www.gregspizzaroute38ma.com/#menu" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', color: '#fff', letterSpacing: '2px' }}>VIEW MENU</a>
                    <a href="#about" onClick={scrollToAbout} style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', color: '#fff', letterSpacing: '2px' }}>ABOUT US</a>
                </div>
            </div>
            
            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    onClick={() => setIsMenuOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1999 }} 
                />
            )}
        </nav>
    );
};

export default Navbar;
