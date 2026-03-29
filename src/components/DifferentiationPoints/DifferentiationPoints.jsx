import { motion } from 'framer-motion';
import { variants, staggerContainer, SectionHeader } from '../AnimatedSection/AnimatedSection';
import './DifferentiationPoints.css';

const points = [
    { text: 'No scanner-only teaching — manual methodology is required', path: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.954 0 0112 2.944a11.955 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { text: 'Exploit validation required before module completion', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { text: 'Report writing is graded to industry standard', path: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { text: 'Real-world simulation labs, not toy CTF environments', path: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { text: 'Industry-mimicking methodology used in actual consultancies', path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { text: 'Bug bounty track teaches real platform workflows', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { text: 'AI security is treated as a specialized red team discipline', path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
];

function DifferentiationPoints() {
    return (
        <section className="dp-section">
            <div className="dp-threads-bg" />
            <div className="dp-container">
                <SectionHeader
                    className="dp-header"
                    title="Differentiation Points"
                    subtitle="What sets our training apart from the rest."
                />
                <div className="dp-divider" />

                <motion.div
                    className="dp-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer(0.08)}
                >
                    {points.map((pt, i) => (
                        <motion.div
                            key={i}
                            className="dp-card visible"
                            variants={variants.fadeUp}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="dp-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={pt.path} />
                                </svg>
                            </div>
                            <p className="dp-text">{pt.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default DifferentiationPoints;
