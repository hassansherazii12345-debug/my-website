import React from 'react';

/**
 * Brand Logo Lockup
 * Replaces the melted cheese effect with a highly premium, sleek metallic 
 * gold radiant crown and geometric style. Scaled up for better visibility.
 */
const MeltedCheeseTitle = ({ className = '', style = {} }) => {
    // Hardcoded IDs are used because dynamic IDs combined with React remounts 
    // or GSAP animations often cause Safari to lose the gradient reference 
    // and render the text strictly as black.
    const goldGradId = 'gregs-ultraGold-static';
    const redGradId = 'gregs-glowRed-static';

    return (
        <div
            className={`luxury-brand-logo ${className}`}
            style={{
                ...style,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                overflow: 'visible',
                // Placed the drop-shadow safely on the div to prevent SVG hardware acceleration blackout on iOS
                filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))',
                transform: 'translateZ(0)', // Force GPU layer lock
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
                }}
                role="img"
                aria-label="Greg's Pizza Route 38"
            >
                <defs>
                    <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE066" />
                        <stop offset="20%" stopColor="#F8B500" />
                        <stop offset="50%" stopColor="#FFF2A8" />
                        <stop offset="80%" stopColor="#F8B500" />
                        <stop offset="100%" stopColor="#E68A00" />
                    </linearGradient>
                    
                    <linearGradient id={redGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF4B2B" />
                        <stop offset="100%" stopColor="#DB3B31" />
                    </linearGradient>
                </defs>

                <g>
                    {/* Creative Radiant Crown / Crest at the Top */}
                    {/* Center Tall Diamond */}
                    <polygon points="500,10 520,60 500,90 480,60" fill={`url(#${goldGradId})`} />
                    {/* Left Diamond */}
                    <polygon points="460,30 475,65 460,85 445,65" fill={`url(#${redGradId})`} />
                    {/* Right Diamond */}
                    <polygon points="540,30 555,65 540,85 525,65" fill={`url(#${redGradId})`} />
                    
                    {/* Elegant sweeping accent curves extending from the crest */}
                    <path d="M 440 75 Q 250 80 50 40" fill="none" stroke={`url(#${goldGradId})`} strokeWidth="4" strokeLinecap="round" />
                    <path d="M 560 75 Q 750 80 950 40" fill="none" stroke={`url(#${goldGradId})`} strokeWidth="4" strokeLinecap="round" />

                    {/* Massive Primary Elegance Text for maximum visibility */}
                    <text 
                        x="500" y="210" 
                        textAnchor="middle" 
                        fontFamily="'Playfair Display', serif" 
                        fontStyle="italic" 
                        fontWeight="900" 
                        fontSize="180" 
                        letterSpacing="4" 
                        fill={`url(#${goldGradId})`}
                    >
                        Greg's
                    </text>

                    {/* Thick Geometric Dividing Ribbon */}
                    <rect x="250" y="235" width="500" height="4" rx="2" fill={`url(#${redGradId})`} />
                    <circle cx="500" cy="237" r="8" fill={`url(#${goldGradId})`} />

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
