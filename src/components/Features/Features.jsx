import { motion } from 'framer-motion';
import { Shield, FlaskConical, Bot, Globe, Users, TrendingUp } from 'lucide-react';
import { variants, staggerContainer, SectionHeader } from '../AnimatedSection/AnimatedSection';
import './Features.css';

const features = [
    {
        icon: <Bot size={26} strokeWidth={2} />,
        title: 'AI Security Engineering',
        description: 'Learn to secure LLMs, defend against prompt injections, and implement AI-driven zero-trust architectures.',
    },
    {
        icon: <FlaskConical size={26} strokeWidth={2} />,
        title: 'Advanced ML Cyber Labs',
        description: 'Train machine learning models to detect anomalies, analyze malware, and automate incident response pipelines.',
    },
    {
        icon: <Shield size={26} strokeWidth={2} />,
        title: 'Cyber Tool Development',
        description: 'Go beyond using tools — learn Python and C++ to build your own custom offensive and defensive security software.',
    },
    {
        icon: <Globe size={26} strokeWidth={2} />,
        title: 'Cloud & AI Infrastructure',
        description: 'Secure massive cloud deployments handling AI workloads across AWS, Azure, and GCP using infrastructure-as-code.',
    },
    {
        icon: <Users size={26} strokeWidth={2} />,
        title: 'Elite Mentor Network',
        description: 'Get 1-on-1 code reviews and security architecture guidance from industry veterans building AI systems at scale.',
    },
    {
        icon: <TrendingUp size={26} strokeWidth={2} />,
        title: 'Future-Proof Placements',
        description: 'Graduate uniquely positioned for high-paying roles at the intersection of Cybersecurity and Artificial Intelligence.',
    },
];

function Features() {
    return (
        <section className="features-section">
            <div className="features-container">

                {/* Header */}
                <SectionHeader
                    className="features-header"
                    eyebrow="Thread Security Academy"
                    title="Why We Stand Out"
                    subtitle="Built for learners who want real skills, not just certificates — here's what makes our platform different."
                />

                {/* Feature Cards Grid */}
                <motion.div
                    className="features-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer(0.1)}
                >
                    {features.map((f) => (
                        <motion.div
                            className="feature-card"
                            key={f.title}
                            variants={variants.scaleIn}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="feature-card-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default Features;
