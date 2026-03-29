import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { variants, SectionHeader } from '../AnimatedSection/AnimatedSection';
import './FAQ.css';

const faqs = [
    {
        question: 'Is coding experience required?',
        answer: 'While having a basic understanding of logic helps, our foundational tracks are designed to teach you the necessary scripting and automation skills from scratch. No prior expert-level coding is required.',
    },
    {
        question: 'Is this beginner friendly?',
        answer: 'Absolutely. We offer a structured learning path that starts with the fundamentals of networking and security before moving into advanced penetration testing and defense strategies.',
    },
    {
        question: 'Do you provide placement or career support?',
        answer: 'Yes, we provide resume reviews, mock interviews, and access to our exclusive partner hiring network to help you land your first role in cybersecurity.',
    },
    {
        question: 'Is the certification industry recognized?',
        answer: 'Thread Security certifications are highly regarded by industry leaders. Our hands-on approach ensures that the certificate represents practical, real-world skills that employers value.',
    },
    {
        question: 'How are labs accessed?',
        answer: "All labs are browser-based and hosted in our private cloud. You don't need to set up complex virtual machines locally; just log in and start practicing.",
    },
    {
        question: 'Is it legal to practice these skills?',
        answer: 'Yes, when practiced in our controlled lab environments. We emphasize ethical hacking principles and legal compliance throughout our curriculum.',
    },
    {
        question: 'Do I need to buy any tools or software?',
        answer: 'No. We provide access to all the necessary premium security tools within our platform. You only need a modern web browser and a stable internet connection.',
    },
    {
        question: 'Can I switch tracks after enrolling?',
        answer: 'Yes, we offer flexibility for students to switch between tracks during the first 14 days of enrollment, depending on availability and prerequisite completion.',
    },
];

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                {/* Header */}
                <SectionHeader
                    className="faq-header"
                    title="Frequently Asked Questions"
                    subtitle="Get quick answers to the most common queries."
                />

                {/* Accordion */}
                <motion.div
                    className="faq-accordion"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {faqs.map((item, index) => (
                        <div
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            key={index}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggle(index)}
                                aria-expanded={activeIndex === index}
                            >
                                <span className={`question-text ${activeIndex === index ? 'highlighted' : ''}`}>
                                    {item.question}
                                </span>
                                <svg
                                    className={`faq-icon ${activeIndex === index ? 'rotated' : ''}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 4v16" />
                                    <path d="M4 12h16" />
                                </svg>
                            </button>
                            <AnimatePresence initial={false}>
                                {activeIndex === index && (
                                    <motion.div
                                        className="faq-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                        style={{ overflow: 'hidden', paddingBottom: '1.5rem' }}
                                    >
                                        <p>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="faq-cta"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <p className="faq-cta-text">Still have questions?</p>
                    <a href="#contact" className="faq-cta-btn">
                        Contact us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default FAQ;
