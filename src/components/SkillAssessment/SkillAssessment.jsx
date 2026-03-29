import { motion } from 'framer-motion';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import './SkillAssessment.css';

const steps = [
    {
        title: 'Adaptive Technical Assessment',
        description: '15-minute challenge designed to benchmark your current security expertise with precision.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M6 20V10M18 20V4" />
            </svg>
        ),
    },
    {
        title: 'Dynamic Difficulty Scaling',
        description: 'The AI engine adjusts question complexity in real-time based on your prior answers for optimal measurement.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
        ),
    },
    {
        title: 'Comprehensive Output',
        description: 'Receive your Security Aptitude Score paired with a detailed Skill Gap Map for targeted improvement.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-2-2" />
            </svg>
        ),
    },
    {
        title: 'Personalized Track Logic',
        description: 'Instant generation of a custom learning roadmap tailored to your specific career objectives.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2h7a2 2 0 0 1 2 2v18" />
                <path d="M12 2v20" />
                <path d="m7 18-5-5 5-5" />
                <path d="M2 13h10" />
            </svg>
        ),
    },
    {
        title: 'Direct Enrollment Path',
        description: 'Seamlessly transition from assessment to onboarding for immediate specialization access.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        title: 'Profile Persistence',
        description: 'Your scores are securely stored in your user profile for continuous progress tracking and benchmarking.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
];

function SkillAssessment() {
    return (
        <section className="skill-section">
            <div className="skill-wrapper">
                {/* Header */}
                <motion.header
                    className="skill-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <span className="skill-badge">Adaptive Logic</span>
                    <h2 className="skill-title">
                        Skill Assessment System Flow
                    </h2>
                </motion.header>

                {/* Cards Grid */}
                <motion.div
                    className="skill-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer(0.1)}
                >
                    {steps.map((step) => (
                        <motion.div
                            className="skill-card slide-up"
                            key={step.title}
                            style={{ opacity: 1 }}
                            variants={variants.scaleIn}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="skill-card-icon">{step.icon}</div>
                            <h3 className="skill-card-title">{step.title}</h3>
                            <p className="skill-card-desc">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default SkillAssessment;
