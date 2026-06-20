import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import FallBeamBackground from '../FallBeamBackground/FallBeamBackground';
import './ProgramStructure.css';

const curriculum = [
    {
        week: 'WEEK 01-04',
        title: 'Cyber & AI Foundations',
        desc: 'Core OS internals, networking protocols, and fundamentals of Machine Learning algorithms.',
        details: [
            'OS Internals & Kernel Security (Linux, Windows)',
            'Advanced Networking, TCP/IP Stack, and Wireshark Traffic Analysis',
            'Mathematics for Machine Learning: Linear Algebra & Probability',
            'Neural Network Fundamentals & Backpropagation from Scratch',
            'Custom Threat Modeling for AI-Enhanced Systems'
        ]
    },
    {
        week: 'WEEK 05-08',
        title: 'AI-Driven Recon & Defense',
        desc: 'Building LLM-assisted threat hunting tools and automating security pipelines using Python/AI.',
        details: [
            'Automated Threat Intelligence & OSINT Scraping with LLMs',
            'Python Scripting for Defense Automation & SIEM Integration',
            'Machine Learning Anomaly Detection on Network Logs',
            'Building and Deploying Guardrails for LLM Application Frameworks',
            'AI-Assisted Static & Dynamic Malware Analysis'
        ]
    },
    {
        week: 'WEEK 09-12',
        title: 'Advanced AI Exploitation',
        desc: 'Adversarial machine learning, model evasion, and vulnerability research in AI systems.',
        details: [
            'Adversarial Machine Learning: Evasion Attacks (FGSM, PGD)',
            'Poisoning Attacks & Training Data Impairment Mechanics',
            'Prompt Injection Vectors: Direct & Indirect Injections',
            'Evasion of Commercial AI Guardrails & Jailbreaking Technics',
            'Pentesting and Auditing Enterprise AI Infrastructure'
        ]
    },
    {
        week: 'WEEK 13+',
        title: 'Capstone: Cyber-AI Agent',
        desc: 'Develop and deploy an autonomous, self-learning security agent in a live network environment.',
        details: [
            'Architecture Design of Autonomous AI Agents (LangChain, AutoGPT)',
            'Implementing Action-Observation Feedback Loops in Defensive Agents',
            'Deploying Agents in Containerized Cloud Environments (Docker/K8s)',
            'Red-Team vs Blue-Team Simulation: Agent Efficacy Auditing',
            'Expert Project Review & Placement-Ready Portfolio Showcase'
        ]
    }
];

function ProgramStructure() {
    const plans = ['3 Months', '6 Months', '12 Months'];
    const activePlan = '3 Months';

    const [openFolderIdx, setOpenFolderIdx] = useState(null);

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
                            className="folder-wrapper"
                            variants={variants.scaleIn}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="cyber-folder" onClick={() => setOpenFolderIdx(idx)}>
                                <div className="folder-tab">
                                    <span>{item.week}</span>
                                </div>
                                <div className="folder-body-back">
                                    <div className="folder-paper-preview">
                                        <div className="preview-line"></div>
                                        <div className="preview-line short"></div>
                                        <div className="preview-line"></div>
                                    </div>
                                </div>
                                <div className="folder-body-front">
                                    <h4 className="folder-title">{item.title}</h4>
                                    <p className="folder-desc-short">{item.desc}</p>
                                    <div className="folder-click-hint">Click to open</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Expanded Paper Document Modal overlay */}
            <AnimatePresence>
                {openFolderIdx !== null && (
                    <motion.div 
                        className="paper-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenFolderIdx(null)}
                    >
                        <motion.div 
                            className="paper-document-content"
                            initial={{ y: 250, scale: 0.4, opacity: 0, rotate: -8 }}
                            animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ y: 250, scale: 0.4, opacity: 0, rotate: -8 }}
                            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button className="paper-close-btn" onClick={() => setOpenFolderIdx(null)}>
                                <X size={20} />
                            </button>
                            
                            {/* Paper body */}
                            <div className="paper-header">
                                <span className="paper-week-badge">{curriculum[openFolderIdx].week}</span>
                                <h3 className="paper-title">{curriculum[openFolderIdx].title}</h3>
                            </div>
                            
                            <div className="paper-divider"></div>
                            
                            <div className="paper-details">
                                <h5>Syllabus Modules</h5>
                                <ul className="paper-modules-list">
                                    {curriculum[openFolderIdx].details.map((detail, dIdx) => (
                                        <li key={dIdx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default ProgramStructure;
