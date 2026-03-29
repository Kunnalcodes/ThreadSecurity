import React from 'react';

const DarkVeil = ({
    hueShift = 0,
    noiseIntensity = 1,
    scanlineIntensity = 0,
    speed = 0.5,
    scanlineFrequency = 0,
    warpAmount = 0,
    className = ""
}) => {
    return (
        <div 
            className={`darkveil-container ${className}`}
            style={{
                position: 'absolute', 
                inset: 0, 
                overflow: 'hidden', 
                backgroundColor: '#000000', 
                pointerEvents: 'none', 
                zIndex: 0
            }}
        >
            {/* The Glowing Green Veil */}
            <div 
                className="darkveil-mesh"
                style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: `
                        radial-gradient(circle at 40% 40%, rgba(68, 132, 7, 0.25) 0%, transparent 45%),
                        radial-gradient(ellipse at 80% 20%, rgba(68, 132, 7, 0.1) 0%, transparent 40%),
                        radial-gradient(ellipse at 20% 80%, rgba(68, 132, 7, 0.2) 0%, transparent 50%)
                    `,
                    filter: `hue-rotate(${hueShift}deg) blur(20px)`,
                    animation: `veilFloat ${1 / (speed || 0.5) * 8}s ease-in-out infinite alternate`,
                    transformOrigin: 'center center'
                }}
            />
            
            {/* Noise Overlay */}
            {noiseIntensity > 0 && (
                <div 
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        opacity: noiseIntensity * 0.15,
                        mixBlendMode: 'overlay'
                    }}
                />
            )}

            {/* Scanlines Overlay */}
            {scanlineIntensity > 0 && (
                <div 
                    style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, ${scanlineIntensity * 0.5}) 51%)`,
                        backgroundSize: `100% ${100 / (scanlineFrequency || 50)}px`,
                        opacity: scanlineIntensity
                    }}
                />
            )}
            
            <style>{`
                @keyframes veilFloat {
                    0% { transform: scale(1) translateY(0) rotate(0deg); }
                    33% { transform: scale(${1.05 + warpAmount}) translateY(-30px) rotate(1deg); }
                    66% { transform: scale(${1.1 + warpAmount}) translateY(15px) rotate(-1deg); }
                    100% { transform: scale(1) translateY(0) rotate(0deg); }
                }
            `}</style>
        </div>
    );
};

export default DarkVeil;
