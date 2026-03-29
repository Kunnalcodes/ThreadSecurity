import { motion } from 'framer-motion';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import FallBeamBackground from '../FallBeamBackground/FallBeamBackground';
import './ProgramStructure.css';

function ProgramStructure() {
    const plans = ['3 Months', '6 Months', '12 Months'];
    const activePlan = '3 Months';

    const curriculum = [
        {
            week: 'WEEK 01-04',
            title: 'Cyber & AI Foundations',
            desc: 'Core OS internals, networking protocols, and fundamentals of Machine Learning algorithms.',
        },
        {
            week: 'WEEK 05-08',
            title: 'AI-Driven Recon & Defense',
            desc: 'Building LLM-assisted threat hunting tools and automating security pipelines using Python/AI.',
        },
        {
            week: 'WEEK 09-12',
            title: 'Advanced AI Exploitation',
            desc: 'Adversarial machine learning, model evasion, and vulnerability research in AI systems.',
        },
        {
            week: 'WEEK 13+',
            title: 'Capstone: Cyber-AI Agent',
            desc: 'Develop and deploy an autonomous, self-learning security agent in a live network environment.',
        }
    ];

    return (
        <section className="ps-section" id="structure" style={{ position: 'relative', overflow: 'hidden' }}>
            <FallBeamBackground beamColorClass="white" lineCount={30} />
            <div className="ps-container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    className="ps-header-block"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="ps-header-text">
                        <h2 className="ps-title">Program Structure</h2>
                        <p className="ps-subtitle">Structured to build elite professionals in the intersection of AI and Cybersecurity Development.</p>
                    </div>

                    <div className="ps-tabs">
                        {plans.map(plan => (
                            <button
                                key={plan}
                                className={`ps-tab ${plan === activePlan ? 'active' : ''}`}
                            >
                                {plan}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="ps-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer(0.1)}
                >
                    {curriculum.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="ps-card"
                            variants={variants.scaleIn}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="ps-card-hover-border"></div>
                            <div className="ps-card-eyebrow">{item.week}</div>
                            <h4 className="ps-card-title">{item.title}</h4>
                            <p className="ps-card-desc">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default ProgramStructure;
