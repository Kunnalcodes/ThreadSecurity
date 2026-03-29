import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../AnimatedSection/AnimatedSection';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import bgVideo from '../../assets/methodlogy-pixel.webm';
import './MeetTheExperts.css';

const experts = [
    {
        name: "Alex Volkov",
        role: "Founder & CEO",
        avatar: "/assets/avatars/alex.png",
        vision: "Security education must be forged in the heat of real attacks, not built on slides. I founded Thread Security to close the gap between classroom theory and the front lines of modern cyber warfare.",
        trajectory: "Started as a red-team operator at Fortune 500 banks • Led breach-response engagements across 3 continents • Now building the academy he never had.",
        accent: "#4ade80",
        accentBorder: "rgba(74, 222, 128, 0.3)",
        glow: "rgba(74, 222, 128, 0.2)",
        shadow: "rgba(74, 222, 128, 0.07)"
    },
    {
        name: "Elena Vance",
        role: "Lead Security Engineer",
        avatar: "/assets/avatars/elena.png",
        vision: "Exploit research is an art form. My goal at Thread Security is to teach students to see systems the way attackers do — so defenders can always be one step ahead.",
        trajectory: "Published CVE researcher • 10+ yrs in zero-day discovery & exploit automation • Designed offensive CTF infra used by global security conferences.",
        accent: "#22c55e",
        accentBorder: "rgba(34, 197, 94, 0.3)",
        glow: "rgba(34, 197, 94, 0.18)",
        shadow: "rgba(34, 197, 94, 0.06)"
    },
    {
        name: "Marcus Thorne",
        role: "AI / ML Security Mentor",
        avatar: "/assets/avatars/marcus.png",
        vision: "The next frontier of cyber defence is autonomous and adaptive. I train engineers to harness adversarial ML — not fear it — so their systems can heal themselves under fire.",
        trajectory: "ML researcher at a Tier-1 AI lab • 3 published papers on autonomous threat response • Building AI-driven detection pipelines that power Thread Security's live labs.",
        accent: "#10b981",
        accentBorder: "rgba(16, 185, 129, 0.3)",
        glow: "rgba(16, 185, 129, 0.18)",
        shadow: "rgba(16, 185, 129, 0.06)"
    },
    {
        name: "Sarah Chen",
        role: "Security Architect",
        avatar: "/assets/avatars/sarah.png",
        vision: "Zero-trust isn't a product — it's a philosophy. I teach engineers to design systems where breaches are assumed and every layer is hardened before the attacker arrives.",
        trajectory: "CISSP certified • 12 yrs across cloud infra, SIEM integration & DevSecOps • Pioneered zero-trust rollouts at two global financial institutions.",
        accent: "#059669",
        accentBorder: "rgba(5, 150, 105, 0.3)",
        glow: "rgba(5, 150, 105, 0.18)",
        shadow: "rgba(5, 150, 105, 0.06)"
    }
];

function MeetTheExperts() {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Galaxy Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        const ctx = canvas.getContext('2d');
        let W, H;
        let stars = [];
        let mouse = { x: -9999, y: -9999 };
        let animationFrameId;

        const buildStars = () => {
            const count = Math.floor((W * H) / 1600);
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.5 + 0.3,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
            }));
        };

        const resize = () => {
            W = canvas.width = section.offsetWidth;
            H = canvas.height = section.offsetHeight;
            buildStars();
        };

        const draw = (t) => {
            ctx.clearRect(0, 0, W, H);
            stars.forEach(s => {
                const twinkle = 0.55 + 0.35 * Math.sin(t * 0.001 * s.speed + s.phase);
                s.x += s.vx;
                s.y += s.vy;
                if (s.x < 0) s.x = W;
                if (s.x > W) s.x = 0;
                if (s.y < 0) s.y = H;
                if (s.y > H) s.y = 0;

                const dx = s.x - mouse.x;
                const dy = s.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110 && dist > 0) {
                    const force = ((110 - dist) / 110) * 2;
                    s.x += (dx / dist) * force;
                    s.y += (dy / dist) * force;
                }

                const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
                grd.addColorStop(0, `rgba(185,240,255,${twinkle})`);
                grd.addColorStop(0.4, `rgba(80,185,255,${twinkle * 0.3})`);
                grd.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220,248,255,${twinkle})`;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        window.addEventListener('resize', resize);
        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            if (section) {
                section.removeEventListener('mousemove', handleMouseMove);
                section.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handlePrev = () => {
        setCurrentSlide(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide(prev => Math.min(experts.length - 1, prev + 1));
    };

    const CARD_WIDTH = 348; // 320px width + 28px gap

    return (
        <section className="experts-section" ref={sectionRef} id="experts-section" style={{ position: 'relative' }}>
            {/* Background Video (Replaces Galaxy Canvas) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, backgroundColor: '#000' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}>
                    <source src={bgVideo} type="video/webm" />
                </video>
            </div>

            <div className="experts-content-wrapper" style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <motion.div
                    className="experts-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h2>Meet the Experts</h2>
                    <p>The technical minds behind Thread Security — engineering the future of offensive and defensive security training.</p>
                </motion.div>

                {/* Slider Controls */}
                <div className="experts-slider-controls">
                    <button className="experts-slider-btn" aria-label="Previous" onClick={handlePrev}>
                        <ChevronLeft size={20} />
                    </button>
                    <button className="experts-slider-btn" aria-label="Next" onClick={handleNext}>
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Slider Track */}
                <motion.div
                    className="experts-slider-outer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div
                        className="experts-slider-track"
                        style={{ transform: `translateX(-${currentSlide * CARD_WIDTH}px)` }}
                    >
                        {experts.map((expert, idx) => (
                            <div
                                className="expert-flip-card"
                                key={idx}
                                style={{
                                    '--card-accent': expert.accent,
                                    '--card-accent-border': expert.accentBorder,
                                    '--card-glow': expert.glow,
                                    '--card-shadow': expert.shadow,
                                }}
                            >
                                <div className="expert-flip-card-inner">
                                    {/* Front */}
                                    <div className="expert-flip-face expert-flip-front">
                                        <div className="expert-front-avatar">
                                            {expert.avatar ? (
                                                <img src={expert.avatar} alt={expert.name} loading="lazy" />
                                            ) : (
                                                <div className="expert-front-avatar-placeholder">
                                                    <User size={80} opacity={0.25} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="expert-front-info">
                                            <div className="expert-front-name">{expert.name}</div>
                                            <div className="expert-front-role">{expert.role}</div>
                                            <div className="expert-front-divider"></div>
                                            <div className="expert-front-hint">hover to reveal &rsaquo;</div>
                                        </div>
                                    </div>

                                    {/* Back */}
                                    <div className="expert-flip-face expert-flip-back">
                                        <div className="expert-back-header">
                                            <div className="expert-back-mini-avatar">
                                                {expert.avatar ? (
                                                    <img src={expert.avatar} alt={expert.name} />
                                                ) : (
                                                    <User size={24} />
                                                )}
                                            </div>
                                            <div className="expert-back-name-block">
                                                <h4>{expert.name}</h4>
                                                <span>{expert.role} — Thread Security</span>
                                            </div>
                                        </div>
                                        <div className="expert-back-sep"></div>

                                        <div className="expert-back-section">
                                            <div className="expert-back-label">Vision</div>
                                            <p className="expert-back-quote">&ldquo;{expert.vision}&rdquo;</p>
                                        </div>

                                        <div className="expert-back-section">
                                            <div className="expert-back-label">Trajectory</div>
                                            <p className="expert-back-plain">{expert.trajectory}</p>
                                        </div>

                                        <div className="expert-back-footer">↻ hover away to flip back</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Dots */}
                <div className="experts-slider-dots">
                    {experts.map((_, idx) => (
                        <div
                            key={idx}
                            className={`expert-dot ${idx === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(idx)}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MeetTheExperts;
