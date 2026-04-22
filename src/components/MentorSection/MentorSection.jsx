import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Shield, Terminal, Zap, Code, Target, Crosshair, Briefcase, FileCode } from 'lucide-react';
import './MentorSection.css';
import eventImg1 from '../../assets/hackviet__hackathon2026__techfest__codinglife__co.jpg.jpeg';
import eventImg2 from '../../assets/threadsecurity__cybersecurity__blockchain__hackat.jpg.jpeg';

const mentors = [
    {
        id: 1,
        name: "Alex Volkov",
        role: "Founder & Head of Offensive Security",
        expertise: ["Red Teaming", "Zero-Day Research", "Exploit Dev"],
        bio: "Former lead at multiple advanced threat groups. Alex specializes in tearing down secure perimeters and finding vulnerabilities where none seem to exist.",
        icon: <Zap size={24} />,
        accent: "#afff00",
        stats: { engagements: "150+", bounties: "$2M+", students: "500+" }
    },
    {
        id: 2,
        name: "Elena Vance",
        role: "Lead Defensive Architect",
        expertise: ["Cloud Security", "Zero Trust", "Threat Hunting"],
        bio: "Elena architects the unbreachable. She shifted from hunting hackers to building the infrastructure they can't penetrate. Her modules are legendarily tough.",
        icon: <Shield size={24} />,
        accent: "#5dd62c",
        stats: { engagements: "300+", architectures: "50+", students: "1200+" }
    },
    {
        id: 3,
        name: "Marcus Thorne",
        role: "AI Threat Specialist",
        expertise: ["Adversarial ML", "Automated Defense", "Data Poisoning"],
        bio: "The line between AI and cybersecurity is where Marcus lives. He trains students to build autonomous response systems and attack competing ML models.",
        icon: <Terminal size={24} />,
        accent: "#00fff5",
        stats: { papers: "12", modelsDefeated: "45", students: "350+" }
    },
    {
        id: 4,
        name: "Sarah Chen",
        role: "Cryptography & Blockchain",
        expertise: ["Smart Contract Audits", "DeFi Security", "Cryptography"],
        bio: "Sarah dissects the math behind the money. If there's a flaw in the logic of a decentralized system, she'll find it—and teach you how to patch it.",
        icon: <Code size={24} />,
        accent: "#f4bbff",
        stats: { audits: "80+", vulnerabilities: "200+", students: "800+" }
    }
];

function MentorSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const nextMentor = () => setActiveIndex((prev) => (prev + 1) % mentors.length);
    const prevMentor = () => setActiveIndex((prev) => (prev - 1 + mentors.length) % mentors.length);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) - 0.5;
            const y = (e.clientY / innerHeight) - 0.5;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="mentor-section-3d" ref={containerRef}>
            
            {/* Background 3D Grid Effect */}
            <div 
                className="mentor-bg-grid" 
                style={{
                    transform: `rotateX(${origin + mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`
                }}
            ></div>

            <div className="mentor-header">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mentor-title"
                >
                    Elite <span>Mentorship</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Train under the industry's most battle-tested operators. No academics, just real-world practitioners.
                </motion.p>
            </div>

            <div className="mentor-3d-scene">
                <div 
                    className="mentor-carousel" 
                    style={{
                        transform: `rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
                    }}
                >
                    {mentors.map((mentor, index) => {
                        // Calculate relative position (-length to +length)
                        let offset = index - activeIndex;
                        if (offset < -1) offset += mentors.length;
                        if (offset > 1) offset -= mentors.length;

                        // Magic logic for 3D Flow
                        const isActive = offset === 0;
                        const isPrev = offset === -1;
                        const isNext = offset === 1;

                        const zIndex = isActive ? 10 : 5;
                        const translateX = offset * 120; // Spread apart
                        const translateZ = isActive ? 100 : -150; // Depth
                        const rotateY = offset * -25; // Tilt towards center
                        const opacity = Math.abs(offset) > 1 ? 0 : (isActive ? 1 : 0.4);
                        const pointerEvents = isActive ? 'auto' : 'none';

                        return (
                            <div 
                                key={mentor.id} 
                                className={`mentor-card-3d ${isActive ? 'active' : ''}`}
                                style={{
                                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                                    zIndex,
                                    opacity,
                                    pointerEvents,
                                    '--accent': mentor.accent
                                }}
                            >
                                <div className="mentor-card-inner">
                                    <div className="mentor-card-glow"></div>
                                    <div className="mentor-icon-wrapper">{mentor.icon}</div>
                                    <div className="mentor-content">
                                        <h3 className="mentor-name">{mentor.name}</h3>
                                        <h4 className="mentor-role">{mentor.role}</h4>
                                        <div className="mentor-bio">
                                            <p>{mentor.bio}</p>
                                        </div>
                                        <div className="mentor-expertise">
                                            {mentor.expertise.map((exp, i) => (
                                                <span key={i} className="expertise-badge">{exp}</span>
                                            ))}
                                        </div>
                                        <div className="mentor-stats">
                                            {Object.entries(mentor.stats).map(([k, v]) => (
                                                <div key={k} className="stat-block">
                                                    <span className="stat-value">{v}</span>
                                                    <span className="stat-label">{k}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mentor-card-border"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mentor-controls">
                    <button className="mc-btn" onClick={prevMentor}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="mc-btn" onClick={nextMentor}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="mentor-vision">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="vision-card"
                >
                    <div className="vision-glow"></div>
                    <h3>Our Vision & Mission</h3>
                    <p>
                        We strive to bridge the gap between theoretical knowledge and real-world cyber warfare. 
                        Our mission is to forge an elite cadre of security professionals equipped to anticipate, 
                        dismantle, and secure the digital frontier against advanced, ever-evolving threats.
                    </p>
                </motion.div>
            </div>

            <div className="mentor-partners">
                <p className="partners-title">Mentors bring elite experience from</p>
                <div className="marquee-container">
                    <div className="marquee-track">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="marquee-group">
                                <span>Google Project Zero</span>
                                <span className="partner-dot">•</span>
                                <span>NSA</span>
                                <span className="partner-dot">•</span>
                                <span>CrowdStrike</span>
                                <span className="partner-dot">•</span>
                                <span>Palantir</span>
                                <span className="partner-dot">•</span>
                                <span>Cisco Talos</span>
                                <span className="partner-dot">•</span>
                                <span>OffSec</span>
                                <span className="partner-dot">•</span>
                                <span>Mandiant</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Metrics */}
            <div className="mentor-impact">
                <div className="impact-grid">
                    <motion.div className="impact-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h4>10,000+</h4>
                        <p>Students Mentored</p>
                    </motion.div>
                    <motion.div className="impact-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <h4>$5M+</h4>
                        <p>Bounties Secured</p>
                    </motion.div>
                    <motion.div className="impact-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <h4>50+</h4>
                        <p>Enterprise Partners</p>
                    </motion.div>
                    <motion.div className="impact-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <h4>100%</h4>
                        <p>Objective Success</p>
                    </motion.div>
                </div>
            </div>

            {/* How Mentors Help */}
            <div className="mentor-process">
                <div className="process-header">
                    <h3>How Mentors Accelerate Your Growth</h3>
                    <p>We don't just teach. We actively shape you into an elite cybersecurity asset.</p>
                </div>
                <div className="process-grid">
                    <motion.div className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="process-icon"><Target size={28} /></div>
                        <h4>1-on-1 Strategy</h4>
                        <p>Personalized career mapping and continuous capability assessments to fix blind spots.</p>
                    </motion.div>
                    <motion.div className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <div className="process-icon"><Crosshair size={28} /></div>
                        <h4>Live Attack Simulation</h4>
                        <p>Shadow mentors in simulated enterprise breach scenarios to learn offensive tactics.</p>
                    </motion.div>
                    <motion.div className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <div className="process-icon"><FileCode size={28} /></div>
                        <h4>Exploit Audits</h4>
                        <p>Line-by-line expert review of your custom payloads and defensive architectures.</p>
                    </motion.div>
                    <motion.div className="process-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <div className="process-icon"><Briefcase size={28} /></div>
                        <h4>Industry Referrals</h4>
                        <p>Direct endorsements to hiring managers at top-tier security firms upon graduation.</p>
                    </motion.div>
                </div>
            </div>

            {/* Events floating cards */}
            <div className="mentor-events">
                <div className="events-header">
                    <h3>Successful Events & Presence</h3>
                    <p>Making our presence felt across the global cybersecurity ecosystem.</p>
                </div>
                <div className="events-grid">
                    <motion.div 
                        className="event-card float-hover"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={eventImg1} alt="Hackathon 2026" />
                        <div className="event-card-overlay"></div>
                        <div className="event-info">
                            <h4>HackViet 2026</h4>
                            <p>Global Hackathon TechFest</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="event-card float-hover"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                    >
                        <img src={eventImg2} alt="ThreadSecurity Hackathon" />
                        <div className="event-card-overlay"></div>
                        <div className="event-info">
                            <h4>Cyber & Blockchain</h4>
                            <p>ThreadSecurity Challenge</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="event-card float-hover"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <img src={eventImg1} alt="Global Tech Presence" />
                        <div className="event-card-overlay"></div>
                        <div className="event-info">
                            <h4>Defensive Frontier</h4>
                            <p>Industry Wide Footprint</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default MentorSection;
