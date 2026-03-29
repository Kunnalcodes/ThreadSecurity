import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../AnimatedSection/AnimatedSection';
import hofVideo from '../../assets/floatingline-HOF.webm';
import './HallOfFame.css';

const insights = [
    {
        quote: "The future of security isn't about better locks, it's about smarter observers. AI will redefine the role of the defender.",
        name: "Dr. Elena Volkov",
        role: "Head of Research"
    },
    {
        quote: "We are entering an era of 'Prompt Exploitation' where the human-machine interface becomes the primary attack vector.",
        name: "Marcus Thorne",
        role: "Offensive Lead"
    },
    {
        quote: "Zero Trust is no longer a luxury; it is the fundamental requirement for survival in a post-quantum world.",
        name: "Sarah Chen",
        role: "Security Architect"
    }
];

function HallOfFame() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const next = () => setCurrentIndex(prev => (prev + 1) % insights.length);
    const prev = () => setCurrentIndex(prev => (prev - 1 + insights.length) % insights.length);

    // Auto rotate
    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, []);

    // Helper for stack styles
    const getCardStyle = (index) => {
        // Calculate offset from current
        let offset = index - currentIndex;
        if (offset < 0) offset += insights.length; // 0, 1, 2... 

        // Current = 0 offset
        // Next = 1 offset
        const scale = 1 - (offset * 0.05); // 1, 0.95, 0.9
        const translateX = offset * 20; // 0px, 20px, 40px
        const translateY = offset * 20;
        const opacity = 1 - (offset * 0.3); // 1, 0.7, 0.4
        const zIndex = insights.length - offset;

        return {
            transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            opacity,
            zIndex,
            pointerEvents: offset === 0 ? 'auto' : 'none'
        };
    };

    return (
        <section className="hof-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#000' }}>
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="hof-video-bg"
                >
                    <source src={hofVideo} type="video/webm" />
                </video>
            </div>
            <div className="hof-container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    className="hof-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h2>Hall of Fame</h2>
                    <p>Insights from our leading researchers.</p>
                </motion.div>

                <motion.div
                    className="hof-stack-area"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="hof-stack" ref={containerRef}>
                        {insights.map((insight, i) => (
                            <div
                                key={i}
                                className="hof-card"
                                style={getCardStyle(i)}
                                onClick={() => i === currentIndex && next()}
                            >
                                <div className="hof-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" />
                                        <path strokeWidth="2" stroke="var(--accent)" d="M12 14a7 7 0 00-7 7" />
                                    </svg>
                                </div>
                                <p className="hof-quote">"{insight.quote}"</p>
                                <div className="hof-author">
                                    <div className="hof-avatar" />
                                    <div className="hof-author-details">
                                        <h4>{insight.name}</h4>
                                        <span>{insight.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hof-nav">
                        <button onClick={prev} aria-label="Previous">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={next} aria-label="Next">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default HallOfFame;
