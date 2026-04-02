import React from 'react';

/**
 * Brand Logo Lockup
 * Replaces the melted cheese effect with a highly premium, sleek metallic 
 * gold radiant crown and geometric style. Scaled up for better visibility.
 */
const MeltedCheeseTitle = ({ className = '', style = {} }) => {
    return (
        <div
            className={`luxury-brand-logo ${className}`}
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
                viewBox="0 0 1000 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    width: '100%',
                    height: 'auto',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))'
                }}
            >
                <defs>
                    <linearGradient id="ultraGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE066" />
                        <stop offset="20%" stopColor="#F8B500" />
                        <stop offset="50%" stopColor="#FFF2A8" />
                        <stop offset="80%" stopColor="#F8B500" />
                        <stop offset="100%" stopColor="#E68A00" />
                    </linearGradient>
                    
                    <linearGradient id="glowRed" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF4B2B" />
                        <stop offset="100%" stopColor="#DB3B31" />
                    </linearGradient>

                    {/* Enhances the shiny metallic look */}
                    <filter id="bloom">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <g filter="url(#bloom)">
                    {/* Creative Radiant Crown / Crest at the Top */}
                    {/* Center Tall Diamond */}
                    <polygon points="500,10 520,60 500,90 480,60" fill="url(#ultraGold)" />
                    {/* Left Diamond */}
                    <polygon points="460,30 475,65 460,85 445,65" fill="url(#glowRed)" />
                    {/* Right Diamond */}
                    <polygon points="540,30 555,65 540,85 525,65" fill="url(#glowRed)" />
                    
                    {/* Elegant sweeping accent curves extending from the crest */}
                    <path d="M 440 75 Q 250 80 50 40" fill="none" stroke="url(#ultraGold)" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 560 75 Q 750 80 950 40" fill="none" stroke="url(#ultraGold)" strokeWidth="4" strokeLinecap="round" />

                    {/* Massive Primary Elegance Text for maximum visibility */}
                    <text 
                        x="500" y="210" 
                        textAnchor="middle" 
                        fontFamily="'Playfair Display', serif" 
                        fontStyle="italic" 
                        fontWeight="900" 
                        fontSize="180" 
                        letterSpacing="4" 
                        fill="url(#ultraGold)"
                    >
                        Greg's
                    </text>

                    {/* Thick Geometric Dividing Ribbon */}
                    <rect x="250" y="235" width="500" height="4" rx="2" fill="url(#glowRed)" />
                    <circle cx="500" cy="237" r="8" fill="url(#ultraGold)" />

                    {/* Secondary Tracked Text - Bolded for readability when small */}
                    <text 
                        x="500" y="295" 
                        textAnchor="middle" 
                        fontFamily="'Outfit', sans-serif" 
                        fontWeight="800" 
                        fontSize="48" 
                        letterSpacing="18" 
                        fill="#ffffff" 
                    >
                        PIZZA ROUTE 38
                    </text>
                </g>
            </svg>
        </div>
    );
};

export default MeltedCheeseTitle;
