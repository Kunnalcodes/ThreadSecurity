import { motion } from 'framer-motion';
import { variants } from '../AnimatedSection/AnimatedSection';
import { User } from 'lucide-react';
import { getAssetUrl } from '../../config/assets.js';
import './MeetTheExperts.css';

const bgVideo = getAssetUrl('methodlogy-pixel.webm');

const experts = [
    {
        name: "Vishal Kumar",
        role: "Founder & CEO",
        avatar: getAssetUrl('CEO.jpeg'),
        link: "https://share.google/KP5nK4H0RXjyPspQL",
        vision: "Security education must be forged in the heat of real attacks, not built on slides. I founded Thread Security to close the gap between classroom theory and the front lines of modern cyber warfare.",
        trajectory: "We don’t just teach cybersecurity — we train students to perform in the real world. At Thread Security, our focus is on hands-on bug bounty and practical security skills. This is what happens when learning goes beyond theory.",
        accent: "#5dd62c",
        accentBorder: "rgba(93, 214, 44, 0.3)",
        glow: "rgba(93, 214, 44, 0.2)",
        shadow: "rgba(93, 214, 44, 0.07)"
    },
    {
        name: "Sujal Tiwari",
        role: "Chief Technology Officer",
        avatar: getAssetUrl('CTO.jpeg'),
        link: "https://www.linkedin.com/in/-sujaltiwari",
        vision: "Exploit research is an art form. My goal at Thread Security is to teach students to see systems the way attackers do — so defenders can always be one step ahead.",
        trajectory: "Published CVE researcher • 10+ yrs in zero-day discovery & exploit automation • Designed offensive CTF infra used by global security conferences.",
        accent: "#afff00",
        accentBorder: "rgba(175, 255, 0, 0.3)",
        glow: "rgba(175, 255, 0, 0.18)",
        shadow: "rgba(175, 255, 0, 0.06)"
    },
];

function MeetTheExperts() {
    return (
        <section className="experts-section" id="experts-section">
            {/* Background Video */}
            <div className="experts-video-bg">
                <video autoPlay loop muted playsInline preload="metadata">
                    <source src={bgVideo} type="video/webm" />
                </video>
            </div>

            <div className="experts-content-wrapper">
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

                {/* Center aligned responsive grid */}
                <motion.div
                    className="experts-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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
                                            expert.link ? (
                                                <a href={expert.link} target="_blank" rel="noopener noreferrer" className="expert-avatar-link">
                                                    <img src={expert.avatar} alt={expert.name} loading="lazy" />
                                                </a>
                                            ) : (
                                                <img src={expert.avatar} alt={expert.name} loading="lazy" />
                                            )
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
                                                expert.link ? (
                                                    <a href={expert.link} target="_blank" rel="noopener noreferrer" className="expert-avatar-link">
                                                        <img src={expert.avatar} alt={expert.name} />
                                                    </a>
                                                ) : (
                                                    <img src={expert.avatar} alt={expert.name} />
                                                )
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
                </motion.div>
            </div>
        </section>
    );
}

export default MeetTheExperts;
