import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { variants, staggerContainer, SectionHeader } from '../AnimatedSection/AnimatedSection';
import bgVideo from '../../assets/methodlogy-pixel.webm';
import './Methodology.css';

const stages = [
    {
        num: 1,
        title: 'Cyber-AI Core Foundations',
        description: 'Master foundational cybersecurity principles alongside machine learning and neural network architectures.',
        short: 'Security & ML fundamentals.',
    },
    {
        num: 2,
        title: 'Automated Lab Implementation',
        description: 'Build intelligent threat models and train custom defensive AI agents in cloud-based sandboxes.',
        short: 'Building AI defense models.',
    },
    {
        num: 3,
        title: 'Intelligent Exploitation',
        description: 'Execute AI-assisted red-teaming, prompt injection, and adversarial machine learning attacks.',
        short: 'Adversarial AI & Pentesting.',
    },
    {
        num: 4,
        title: 'AI-Enhanced Reporting',
        description: 'Utilize customized LLMs to generate industry-standard vulnerability assessments and threat intel.',
        short: 'Generative AI for reporting.',
    },
    {
        num: 5,
        title: 'Iterative Model Tuning',
        description: 'Refine your defense mechanisms through expert feedback and continuous AI model retraining.',
        short: 'Model optimization & review.',
    },
];

function Methodology() {
    const sectionRef = useRef(null);
    const progressRef = useRef(null);

    // Keep scroll-based progress bar
    useEffect(() => {
        const section = sectionRef.current;
        const progress = progressRef.current;

        const handleScroll = () => {
            if (!section || !progress) return;
            const rect = section.getBoundingClientRect();
            const windowH = window.innerHeight;

            if (rect.top < windowH && rect.bottom > 0) {
                const totalDist = rect.height;
                const scrolledDist = windowH - rect.top;
                let pct = (scrolledDist / totalDist) * 100;
                pct = Math.min(Math.max(pct, 0), 100);
                progress.style.width = `${pct}%`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="methodology-section" ref={sectionRef} id="methodology" style={{ position: 'relative' }}>
            {/* Background Video */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.15, backgroundColor: '#000' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}>
                    <source src={bgVideo} type="video/webm" />
                </video>
            </div>
            
            <div className="methodology-wrapper" style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <SectionHeader 
                    className="methodology-header active"
                    title="Our 5-Stage Learning"
                    titleAccent="Methodology"
                    subtitle="A systematic, industry-aligned approach blending offensive cybersecurity with cutting-edge AI software development."
                />

                {/* Desktop Timeline */}
                <div className="methodology-timeline desktop-only">
                    {/* Progress line */}
                    <div className="progress-line-bg" />
                    <div className="progress-line-fill" ref={progressRef} />

                    <motion.div
                        className="stages-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer(0.12)}
                    >
                        {stages.map((s) => (
                            <motion.div
                                className="active"
                                key={s.num}
                                variants={variants.fadeUp}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <div className="methodology-card">
                                    <div className="stage-number">{s.num}</div>
                                    <h3 className="stage-title">{s.title}</h3>
                                    <p className="stage-desc">{s.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile Stack */}
                <motion.div
                    className="methodology-mobile mobile-only"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer(0.1)}
                >
                    {stages.map((s) => (
                        <motion.div
                            className="mobile-stage active"
                            key={s.num}
                            variants={variants.slideRight}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <span className="mobile-num">0{s.num}</span>
                            <div>
                                <h3 className="stage-title">{s.title}</h3>
                                <p className="stage-desc">{s.short}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

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
