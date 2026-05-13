import { motion } from 'framer-motion';
import { Quote, Award, Bug, Star } from 'lucide-react';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import './Testimonials.css';

const testimonials = [
    {
        quote: "Thread Security was a turning point. As a 6th-sem GNA student, I got real hands-on cybersecurity experience — and earned $1,500 in bounties. It built my confidence and proved my skills have real-world value. Highly recommended for anyone serious about a cybersecurity career.",
        badges: [
            { id: 1, text: "Bug Bounty Hunter", icon: <Award size={14} /> },
            { id: 2, text: "Ethical Hacker", icon: <Award size={14} /> }
        ],
        name: "Monu ",
        role: "Aspiring Security Analyst",
    },
    {
        quote: "Unlike other bootcamps, this curriculum cuts through the marketing fluff. The focus on kernel-level exploits and advanced persistence gave me the edge I needed for my promotion.",
        badges: [
            { id: 1, text: "Lead Researcher", icon: <Star size={14} /> },
            { id: 2, text: "DefCon Speaker", icon: <Star size={14} /> }
        ],
        name: "Sarah Chen",
        role: "Senior Penetration Tester",
    },
    {
        quote: "The academy provided more than just training; it provided a high-octane community of experts. The Red Teaming module alone was worth the entire tuition.",
        badges: [
            { id: 1, text: "CRTP Certified", icon: <Award size={14} /> },
            { id: 2, text: "Bug Hunter", icon: <Bug size={14} /> }
        ],
        name: "Marcus Thorne",
        role: "SOC Tier 3 Manager",
    }
];

// Subtle parallax reaction to mouse movement for background orbs
const handleMouseMove = (e) => {
    const orb1 = document.getElementById('orb1');
    const orb2 = document.getElementById('orb2');
    if (!orb1 || !orb2) return;

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const moveX1 = (mouseX - 0.5) * 40;
    const moveY1 = (mouseY - 0.5) * 40;
    const moveX2 = (mouseX - 0.5) * -60;
    const moveY2 = (mouseY - 0.5) * -60;

    orb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
    orb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
};

function Testimonials() {
    return (
        <section
            className="testimonial-section-bg"
            id="testimonials"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Orbs */}
            <div className="orb orb-1 animate-float" id="orb1"></div>
            <div className="orb orb-2 animate-float-delayed" id="orb2"></div>

            <div className="testimonials-container">
                {/* Header */}
                <motion.div
                    className="testimonials-header is-visible"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <h2 className="title">
                        Student Testimonials
                    </h2>
                    <p className="subtitle">
                        Real feedback. Real achievements.
                    </p>
                </motion.div>

                {/* Testimonial Grid */}
                <motion.div
                    className="testimonials-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer(0.12)}
                >
                    {testimonials.map((test, index) => (
                        <motion.article
                            className="testimonial-card is-visible"
                            key={index}
                            variants={variants.fadeUp}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="card-top">
                                <div className="quote-icon-wrapper">
                                    <Quote className="quote-icon" size={32} />
                                </div>
                                <p className="quote-text">
                                    "{test.quote}"
                                </p>
                            </div>

                            <div className="card-bottom">
                                {/* Achievement Badges */}
                                <div className="badges-wrapper">
                                    {test.badges.map((badge) => (
                                        <span
                                            key={badge.id}
                                            className="badge is-visible"
                                        >
                                            <span className="badge-icon">{badge.icon}</span>
                                            {badge.text}
                                        </span>
                                    ))}
                                </div>

                                {/* Student Profile */}
                                <div className="student-profile">
                                    <h4 className="student-name">{test.name}</h4>
                                    <p className="student-role">{test.role}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* Footer CTA */}
                <motion.div
                    className="testimonials-footer is-visible"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <a className="btn-glare-container inline-block" href="#enquiry">
                        Join Our Next Cohort
                        <div className="btn-glare"></div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonials;
