import React, { useEffect, useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { gsap } from 'gsap';
import MeltedCheeseTitle from './MeltedCheeseTitle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
                    <a href="https://www.gregspizzaroute38ma.com/#menu" className="cart-btn" aria-label="Menu" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
                        <MenuIcon size={24} color="#ffffff" />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
