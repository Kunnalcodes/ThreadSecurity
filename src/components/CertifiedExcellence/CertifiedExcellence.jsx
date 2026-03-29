import { motion } from 'framer-motion';
import { SectionHeader } from '../AnimatedSection/AnimatedSection';
import './CertifiedExcellence.css';

const badges = [
    { name: 'AI.SEC', path: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { name: 'SEC.DEV', path: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { name: 'ML.DEFEND', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'NEURAL', path: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { name: 'RED.TEAM', path: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.233 3.416.658m5.32 12.47c-.388 1.478-1.26 2.733-2.46 3.59m-9.612-4.29A10.004 10.004 0 0022.38 12c0-.832-.113-1.635-.32-2.396M10.38 16.33a3 3 0 10-4.04-4.304M15 15h.01m-6.707-6.707l6.707 6.707' },
];

function CertifiedExcellence() {
    return (
        <section className="certified-excellence-section">
            <SectionHeader
                className="ce-header"
                title="Certified Excellence"
                subtitle="Industry-recognized credentials for modern AI Security Engineers and Cyber Developers."
            />
            <motion.div
                className="ce-marquee-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="ce-marquee-track">
                    {[...badges, ...badges, ...badges, ...badges].map((badge, i) => (
                        <div key={i} className="ce-badge">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={badge.path}></path>
                            </svg>
                            <span>{badge.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default CertifiedExcellence;
