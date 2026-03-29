import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import './Roadmap.css';

const tiers = [
    {
        level: 'Beginner',
        description: 'Foundations, first labs, basic exploit understanding.',
        icon: (
            <svg className="tier-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        level: 'Practitioner',
        description: 'Full module completion, first report submitted.',
        icon: (
            <svg className="tier-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        level: 'Advanced',
        description: 'Capstone engagement, specialization chosen.',
        icon: (
            <svg className="tier-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        ),
    },
    {
        level: 'Specialist',
        description: 'Track mastery, real-world project portfolio.',
        icon: (
            <svg className="tier-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        level: 'Expert',
        description: 'Mentor candidacy, community contribution, research.',
        icon: (
            <svg className="tier-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

function Roadmap() {
    const progressRef = useRef(null);
    const sectionRef = useRef(null);

    // Keep scroll-based progress line
    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            const progress = progressRef.current;
            if (!section || !progress) return;

            const rect = section.getBoundingClientRect();
            let pct = ((window.innerHeight - rect.top) / section.offsetHeight) * 100;
            pct = Math.min(Math.max(pct, 0), 100);

            if (window.innerWidth >= 768) {
                progress.style.width = `${pct}%`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="roadmap-section" ref={sectionRef}>
            <div className="roadmap-wrapper">
                {/* Header */}
                <motion.div
                    className="roadmap-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h2 className="roadmap-title">Career Path Roadmap</h2>
                    <p className="roadmap-subtitle">
                        From foundations to expertise, here's your journey.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="roadmap-timeline">
                    {/* Background & Fill Lines */}
                    <div className="roadmap-line-bg" />
                    <div className="roadmap-line-fill" ref={progressRef} />

                    {/* Tier Cards */}
                    <motion.div
                        className="tiers-row"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer(0.12)}
                    >
                        {tiers.map((t) => (
                            <motion.div
                                className="tier-card reveal-active"
                                key={t.level}
                                variants={variants.fadeUp}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                {/* Timeline node (desktop) */}
                                <div className="tier-node" />

                                <div className="tier-icon-wrap">{t.icon}</div>
                                <h3 className="tier-level">{t.level}</h3>
                                <p className="tier-desc">{t.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                    className="roadmap-cta"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <button className="roadmap-btn">Start Your Journey</button>
                </motion.div>
            </div>
        </section>
    );
}

export default Roadmap;
