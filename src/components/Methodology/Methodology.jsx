import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, FlaskConical, Crosshair, FileText, Sliders } from 'lucide-react';
import { variants, staggerContainer, SectionHeader } from '../AnimatedSection/AnimatedSection';
import { getAssetUrl } from '../../config/assets.js';
import { cn } from '../../lib/utils';
import './Methodology.css';

const bgVideo = getAssetUrl('methodlogy-pixel.webm');

const stages = [
    {
        num: 1,
        title: 'Cyber-AI Core Foundations',
        description: 'Master foundational cybersecurity principles alongside machine learning and neural network architectures.',
        short: 'Security & ML fundamentals.',
        icon: Cpu,
    },
    {
        num: 2,
        title: 'Automated Lab Implementation',
        description: 'Build intelligent threat models and train custom defensive AI agents in cloud-based sandboxes.',
        short: 'Building AI defense models.',
        icon: FlaskConical,
    },
    {
        num: 3,
        title: 'Intelligent Exploitation',
        description: 'Execute AI-assisted red-teaming, prompt injection, and adversarial machine learning attacks.',
        short: 'Adversarial AI & Pentesting.',
        icon: Crosshair,
    },
    {
        num: 4,
        title: 'AI-Enhanced Reporting',
        description: 'Utilize customized LLMs to generate industry-standard vulnerability assessments and threat intel.',
        short: 'Generative AI for reporting.',
        icon: FileText,
    },
    {
        num: 5,
        title: 'Iterative Model Tuning',
        description: 'Refine your defense mechanisms through expert feedback and continuous AI model retraining.',
        short: 'Model optimization & review.',
        icon: Sliders,
    },
];

function Methodology() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const activeCardRef = useRef(null);
    const dragStart = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const autoPlayTimerRef = useRef(null);

    // AutoPlay functions
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayTimerRef.current = setInterval(() => {
            triggerNext();
        }, 5000);
    };

    const stopAutoPlay = () => {
        if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
            autoPlayTimerRef.current = null;
        }
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    // Slide navigation function (Swipe UP)
    const triggerNext = () => {
        if (activeCardRef.current) {
            activeCardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            activeCardRef.current.style.transform = 'perspective(1000px) translate3d(0, -450px, 0) rotateX(15deg)';
            activeCardRef.current.style.opacity = '0';
            
            setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % stages.length);
                if (activeCardRef.current) {
                    activeCardRef.current.style.transition = '';
                    activeCardRef.current.style.transform = '';
                    activeCardRef.current.style.opacity = '';
                }
            }, 400);
        } else {
            setActiveIndex((prev) => (prev + 1) % stages.length);
        }
    };

    // Pointer gesture events for custom swipe UP
    const handlePointerDown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        
        e.currentTarget.setPointerCapture(e.pointerId);
        isDraggingRef.current = true;
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        
        if (activeCardRef.current) {
            activeCardRef.current.style.transition = 'none';
        }
        stopAutoPlay();
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current || !activeCardRef.current) return;
        
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        
        const dragY = Math.min(deltaY, 30); // limit down dragging
        const rotateZ = deltaX * 0.02;
        const rotateX = -dragY * 0.03;
        
        activeCardRef.current.style.transform = `perspective(1000px) translate3d(${deltaX * 0.4}px, ${dragY}px, 0) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg)`;
        
        if (dragY < 0) {
            activeCardRef.current.style.opacity = `${1 - Math.min(Math.abs(dragY) / 400, 0.5)}`;
        } else {
            activeCardRef.current.style.opacity = '1';
        }
    };

    const handlePointerUp = (e) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDragging(false);
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) {
            // ignore
        }
        
        const deltaY = e.clientY - dragStart.current.y;
        const threshold = -80; // drag up 80px or more
        
        if (activeCardRef.current) {
            activeCardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            if (deltaY < threshold) {
                // Fly up
                activeCardRef.current.style.transform = 'perspective(1000px) translate3d(0, -450px, 0) rotateX(15deg)';
                activeCardRef.current.style.opacity = '0';
                
                setTimeout(() => {
                    setActiveIndex((prev) => (prev + 1) % stages.length);
                    if (activeCardRef.current) {
                        activeCardRef.current.style.transition = '';
                        activeCardRef.current.style.transform = '';
                        activeCardRef.current.style.opacity = '';
                    }
                    startAutoPlay();
                }, 400);
            } else {
                // Snap back
                activeCardRef.current.style.transform = 'perspective(1000px) translate3d(0, 0, 0)';
                activeCardRef.current.style.opacity = '1';
                startAutoPlay();
            }
        }
    };

    const handlePointerCancel = (e) => {
        handlePointerUp(e);
    };

    // 3D Parallax hover effects (Active card only)
    const handleMouseMoveCard = (e) => {
        if (isDraggingRef.current || !activeCardRef.current) return;
        
        const card = activeCardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / xc;
        const dy = (y - yc) / yc;
        
        const tiltX = -dy * 8;
        const tiltY = dx * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeaveCard = () => {
        if (!activeCardRef.current) return;
        const card = activeCardRef.current;
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        
        setTimeout(() => {
            if (!isDraggingRef.current && card) {
                card.style.transition = '';
            }
        }, 500);
    };

    const handleMouseEnterCard = () => {
        if (!activeCardRef.current) return;
        activeCardRef.current.style.transition = 'transform 0.1s ease';
    };

    return (
        <section className="methodology-section" id="methodology" style={{ position: 'relative' }}>
            {/* Background Video */}
            <div className="methodology-video-bg">
                <video autoPlay loop muted playsInline preload="metadata">
                    <source src={bgVideo} type="video/webm" />
                </video>
            </div>
            
            <div className="methodology-wrapper" style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <SectionHeader 
                    className="methodology-header active"
                    eyebrow="Pedagogical Blueprint"
                    title="5 Stages of Cyber-AI"
                    titleAccent="Mastery"
                    subtitle="A highly structured, hands-on framework blending offensive cybersecurity tactics with state-of-the-art AI engineering."
                />

                {/* Sliding Stack Layout */}
                <div 
                    className="methodology-stack-wrapper"
                    onMouseEnter={stopAutoPlay}
                    onMouseLeave={startAutoPlay}
                >
                    <div className="methodology-cards-stack">
                        {stages.map((stage, idx) => {
                            const visualOffset = (idx - activeIndex + stages.length) % stages.length;
                            const isActive = visualOffset === 0;
                            
                            const getCardStyle = () => {
                                if (isActive) {
                                    return {
                                        zIndex: 10,
                                        opacity: 1,
                                    };
                                }
                                
                                const zIndex = 10 - visualOffset;
                                const translateZ = -30 * visualOffset;
                                const translateY = 18 * visualOffset;
                                const scale = 1 - 0.06 * visualOffset;
                                const opacity = 1 - 0.22 * visualOffset;
                                
                                return {
                                    zIndex,
                                    transform: `perspective(1000px) translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`,
                                    opacity: opacity < 0 ? 0 : opacity,
                                    pointerEvents: 'none',
                                };
                            };

                            return (
                                <article
                                    key={stage.num}
                                    ref={isActive ? activeCardRef : null}
                                    className={cn(
                                        "methodology-3d-card",
                                        isActive ? "active-card" : "background-card"
                                    )}
                                    style={getCardStyle()}
                                    onPointerDown={isActive ? handlePointerDown : undefined}
                                    onPointerMove={isActive ? handlePointerMove : undefined}
                                    onPointerUp={isActive ? handlePointerUp : undefined}
                                    onPointerCancel={isActive ? handlePointerCancel : undefined}
                                    onMouseMove={isActive ? handleMouseMoveCard : undefined}
                                    onMouseEnter={isActive ? handleMouseEnterCard : undefined}
                                    onMouseLeave={isActive ? handleMouseLeaveCard : undefined}
                                >
                                    <div className="card-top">
                                        <span className="card-stage-pill">STAGE 0{stage.num}</span>
                                        <div className="card-icon-wrapper">
                                            <stage.icon className="card-icon" size={24} />
                                        </div>
                                    </div>
                                    
                                    <h3 className="card-title">{stage.title}</h3>
                                    <p className="card-desc">{stage.description}</p>
                                    
                                    {isActive && (
                                        <div className="card-swipe-hint">
                                            <span>Swipe up to explore</span>
                                            <div className="swipe-arrow-indicator">↑</div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="methodology-indicators">
                    {stages.map((stage, idx) => (
                        <button
                            key={stage.num}
                            onClick={() => {
                                stopAutoPlay();
                                setActiveIndex(idx);
                                startAutoPlay();
                            }}
                            className={cn(
                                "indicator-dot",
                                idx === activeIndex ? "active" : ""
                            )}
                            aria-label={`Go to Stage ${stage.num}`}
                        >
                            <span className="dot-label">0{stage.num}</span>
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="methodology-cta active"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <button className="methodology-btn">
                        Start Your Learning Journey
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

export default Methodology;
