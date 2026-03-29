import { useEffect, useRef } from 'react';
import './CertificationModel.css';

const requirements = [
    {
        title: 'Practical Lab Completion',
        desc: 'Hands-on technical challenges designed to mirror real-world threat landscapes.',
        icon: (
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        title: 'Exploit Validation',
        desc: 'Demonstration of technical proficiency through live validation of security vulnerabilities.',
        icon: (
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: 'Report Submission',
        desc: 'Comprehensive documentation of findings, methodologies, and remediation strategies.',
        icon: (
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        title: 'Capstone Project Evaluation',
        desc: 'A final, intensive practical examination observed and graded by industry experts.',
        icon: (
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        title: 'Peer Review Participation',
        desc: 'Engagement in the academic community through collaborative critique and knowledge sharing.',
        icon: (
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];

const ribbonCerts = [
    { name: 'Advanced Penetration Specialist', rotate: -1 },
    { name: 'Threat Intelligence Analyst', rotate: 1 },
    { name: 'Cloud Security Architect', rotate: -2 },
    { name: 'Offensive Security Expert', rotate: 2 },
];

function CertificationModel() {
    const itemsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        itemsRef.current.forEach((el) => el && observer.observe(el));
        return () => itemsRef.current.forEach((el) => el && observer.unobserve(el));
    }, []);

    return (
        <section className="cert-section" id="certification-model">
            <div className="cert-wrapper">
                {/* Header */}
                <div className="cert-header">
                    <h2 className="cert-title">Certification Model</h2>
                    <p className="cert-subtitle">
                        No MCQ-only paths. Every certificate is earned through real, validated work.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="cert-grid">
                    {/* Left: Requirements */}
                    <div className="cert-left">
                        {requirements.map((req, i) => (
                            <div
                                className="cert-req reveal-item"
                                key={req.title}
                                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                                ref={(el) => (itemsRef.current[i] = el)}
                            >
                                <div className="cert-req-icon">{req.icon}</div>
                                <div>
                                    <h3 className="cert-req-title">{req.title}</h3>
                                    <p className="cert-req-desc">{req.desc}</p>
                                </div>
                            </div>
                        ))}

                        {/* CTA */}
                        <div
                            className="reveal-item"
                            style={{ transitionDelay: '600ms' }}
                            ref={(el) => (itemsRef.current[5] = el)}
                        >
                            <button className="cert-cta-btn">
                                <span>Learn More about Certification</span>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right: Marquee Ribbon */}
                    <div className="cert-ribbon">
                        <div className="cert-ribbon-inner">
                            {/* Items doubled for seamless loop */}
                            {[...ribbonCerts, ...ribbonCerts].map((cert, i) => (
                                <div
                                    className="ribbon-card"
                                    key={`${cert.name}-${i}`}
                                    style={{ transform: `rotate(${cert.rotate}deg)` }}
                                >
                                    <span>{cert.name}</span>
                                    <div className="ribbon-glow" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationModel;
