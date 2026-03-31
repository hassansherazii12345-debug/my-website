import React from 'react';

/**
 * MeltedCheeseTitle
 * A custom SVG-based brand identity for "GREG'S PIZZA ROUTE 38"
 * Optimized for mobile rendering with fallback colors.
 */
const MeltedCheeseTitle = ({ className = '', style = {} }) => {
    return (
        <div
            className={`melted-cheese-brand ${className}`}
            style={{
                ...style,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                margin: '0 auto',
                overflow: 'visible'
            }}
        >
            <svg
                viewBox="0 0 1000 180"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: '100%',
                    height: 'auto',
                    overflow: 'visible',
                    filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.4))'
                }}
            >
                <defs>
                    {/* Explicit linear gradient with userSpaceOnUse for better browser compatibility */}
                    <linearGradient id="cheeseGradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFB800" />
                        <stop offset="70%" stopColor="#FFB800" />
                        <stop offset="100%" stopColor="#E69500" />
                    </linearGradient>

                    {/* Bulbous Teardrop Drip Symbol */}
                    <symbol id="cheese-drip" viewBox="0 0 20 40">
                        {/* Drip Outline */}
                        <path d="M0 0 L20 0 L20 20 C20 35 15 40 10 40 C5 40 0 35 0 20 Z" fill="#000" />
                        {/* Drip Fill with solid fallback */}
                        <path d="M3 0 L17 0 L17 20 C17 32 14 36 10 36 C6 36 3 32 3 20 Z" fill="#FFB800" />
                        {/* Highlight on drip */}
                        <path d="M6 8 C8 8 9 12 9 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                    </symbol>
                </defs>

                {/* Layer 1: The Sticker Outline (Thickest Black) */}
                <g stroke="#000" strokeWidth="18" strokeLinejoin="round" strokeLinecap="round" fill="#000">
                    <text x="500" y="110" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="105" letterSpacing="5">
                        GREG'S PIZZA ROUTE 38
                    </text>
                </g>

                {/* Layer 2: Main Cheese Fill (Added solid fill fallback for mobile browsers where gradient might fail) */}
                <g fill="#FFB800">
                    <text x="500" y="110" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="105" letterSpacing="5" fill="url(#cheeseGradient)">
                        GREG'S PIZZA ROUTE 38
                    </text>
                </g>

                {/* Layer 3: Specular Highlights (Bubble Shine) */}
                <g stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8">
                    <path d="M125 55 Q140 50 155 55" />
                    <path d="M225 55 Q240 50 255 55" />
                    <path d="M295 55 Q310 50 325 55" />
                    <path d="M425 55 Q440 50 455 55" />
                    <path d="M495 55 Q500 50 505 55" />
                    <path d="M565 55 Q580 50 595 55" />
                    <path d="M785 55 Q800 50 815 55" />
                    <path d="M865 55 Q880 50 895 55" />
                </g>

                {/* Layer 4: The Bulbous Viscous Drips */}
                <g transform="translate(0, 105)">
                    <use href="#cheese-drip" x="110" y="0" width="18" height="38" />
                    <use href="#cheese-drip" x="185" y="0" width="14" height="28" />
                    <use href="#cheese-drip" x="245" y="0" width="22" height="48" />
                    <use href="#cheese-drip" x="375" y="0" width="16" height="32" />
                    <use href="#cheese-drip" x="425" y="0" width="12" height="22" />
                    <use href="#cheese-drip" x="485" y="0" width="22" height="52" />
                    <use href="#cheese-drip" x="545" y="0" width="18" height="40" />
                    <use href="#cheese-drip" x="595" y="0" width="14" height="25" />
                    <use href="#cheese-drip" x="715" y="0" width="22" height="46" />
                    <use href="#cheese-drip" x="845" y="0" width="17" height="38" />
                    <use href="#cheese-drip" x="905" y="0" width="20" height="50" />
                </g>
            </svg>
        </div>
    );
};

export default MeltedCheeseTitle;
