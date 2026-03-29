import { useState } from 'react';
import { ArrowRight, Target, Bot, Globe, Shield, Microscope, Cloud, Bug, MoveRight } from 'lucide-react';
import { SectionHeader } from '../AnimatedSection/AnimatedSection';
import './CourseSlider.css';

const courses = [
    {
        id: 1,
        tag: 'Most Popular',
        icon: '🎯',
        title: 'Certified Ethical Hacker',
        subtitle: 'CEH Prep Track',
        description: 'Master the mindset of a hacker to better defend systems. Covers recon, exploitation, post-exploitation, and full exam prep.',
        level: 'Intermediate',
        duration: '12 Weeks',
        modules: '48 Modules',
        gradient: 'linear-gradient(156deg, #eef5ff 0%, #d6e8ff 55%, #e8e0ff 100%)',
        accent: '#5b8dee',
        tagColor: '#5b8dee',
    },
    {
        id: 2,
        tag: 'New',
        icon: '🤖',
        title: 'Cyber AI & ML',
        subtitle: 'Artificial Intelligence Track',
        description: 'Learn to build AI-driven intrusion detection systems, anomaly detectors, and intelligent threat analysis pipelines.',
        level: 'Advanced',
        duration: '10 Weeks',
        modules: '38 Modules',
        gradient: 'linear-gradient(156deg, #edfcf8 0%, #7cbad7ff 89%, #72c0eeff 100%)',
        accent: '#1070b9ff',
        tagColor: '#1070b9ff',
    },
    {
        id: 3,
        tag: 'Beginner Friendly',
        icon: '🌐',
        title: 'Web Development',
        subtitle: 'Full-Stack Security Track',
        description: 'Build secure web applications from scratch. HTML, CSS, JS, React, Node.js and security best practices woven throughout.',
        level: 'Beginner',
        duration: '14 Weeks',
        modules: '56 Modules',
        gradient: 'linear-gradient(156deg, #fffbeb 0%, #47a08dff 89%, #1dc2a9ff 100%)',
        accent: '#277867ff',
        tagColor: '#306c5fff',
    },
    {
        id: 4,
        tag: 'In Demand',
        icon: '🛡️',
        title: 'Network Security',
        subtitle: 'Pentesting & Defence',
        description: 'Deep-dive into network protocols, firewalls, VPNs, IDS/IPS, and hands-on penetration testing of real lab networks.',
        level: 'Intermediate',
        duration: '10 Weeks',
        modules: '40 Modules',
        gradient: 'linear-gradient(156deg, #f3f0ff 0%, #e8e0ff 55%, #d8ccff 100%)',
        accent: '#7c3aed',
        tagColor: '#7c3aed',
    },
    {
        id: 5,
        tag: 'Specialization',
        icon: '🔬',
        title: 'Digital Forensics',
        subtitle: 'Incident Response Track',
        description: 'Collect, preserve, and analyze digital evidence. Covers memory forensics, disk imaging, log analysis, and chain of custody.',
        level: 'Advanced',
        duration: '8 Weeks',
        modules: '32 Modules',
        gradient: 'linear-gradient(156deg, #fff7fb 0%, #fde8f3 55%, #fcd5e8 100%)',
        accent: '#ec4899',
        tagColor: '#db2777',
    },
    {
        id: 6,
        tag: 'Cloud Era',
        icon: '☁️',
        title: 'Cloud Security',
        subtitle: 'AWS · Azure · GCP',
        description: 'Secure cloud workloads across the major providers. IAM, misconfiguration hunting, container security, and compliance.',
        level: 'Intermediate',
        duration: '9 Weeks',
        modules: '36 Modules',
        gradient: 'linear-gradient(156deg, #eff8ff 0%, #d0ecff 55%, #b5deff 100%)',
        accent: '#0284c7',
        tagColor: '#0369a1',
    },
    {
        id: 7,
        tag: 'Expert Level',
        icon: '🦠',
        title: 'Malware Analysis',
        subtitle: 'Reverse Engineering Track',
        description: 'Dissect real malware samples in safe sandboxes. Static and dynamic analysis, assembly reading, and writing YARA rules.',
        level: 'Advanced',
        duration: '8 Weeks',
        modules: '30 Modules',
        gradient: 'linear-gradient(156deg, #f0fdf8 0%, #d8f5ec 55%, #bfedd8 100%)',
        accent: '#065f46',
        tagColor: '#065f46',
    },
];

const CARD_WIDTH = 360; // must match CSS .course-card width
const GAP = 24;         // must match CSS gap on .slider-track

const VISIBLE = 3;
const MAX_INDEX = courses.length - VISIBLE;

function CourseSlider() {
    const [index, setIndex] = useState(0);

    const goTo = (next) => {
        const clamped = Math.max(0, Math.min(next, MAX_INDEX));
        setIndex(clamped);
    };

    const offset = -(index * (CARD_WIDTH + GAP));

    return (
        <section className="slider-section">
            <div className="slider-wrapper">

                {/* Header */}
                <div className="slider-header">
                    <SectionHeader
                        className="slider-header-text"
                        eyebrow="Thread Security Academy"
                        title="Explore the Course Lineup."
                        align="left"
                    />
                    <div className="slider-controls">
                        <button
                            className={`slider-btn${index === 0 ? ' disabled' : ''}`}
                            onClick={() => goTo(index - 1)}
                            aria-label="Previous"
                            disabled={index === 0}
                        >
                            ‹
                        </button>
                        <button
                            className={`slider-btn${index >= MAX_INDEX ? ' disabled' : ''}`}
                            onClick={() => goTo(index + 1)}
                            aria-label="Next"
                            disabled={index >= MAX_INDEX}
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Viewport */}
                <div className="slider-viewport">
                    <div
                        className="slider-track"
                        style={{ transform: `translateX(${offset}px)` }}
                    >
                        {courses.map((course) => (
                            <div
                                className="course-card"
                                key={course.id}
                                style={{ background: course.gradient }}
                            >
                                <span
                                    className="course-tag"
                                    style={{ color: course.tagColor, borderColor: `${course.tagColor}33` }}
                                >
                                    {course.tag}
                                </span>

                                <div className="course-icon-wrap">
                                    <span className="course-icon">{course.icon}</span>
                                </div>

                                <div className="course-text">
                                    <p className="course-subtitle" style={{ color: course.accent }}>{course.subtitle}</p>
                                    <h3 className="course-name">{course.title}</h3>
                                    <p className="course-desc">{course.description}</p>
                                </div>

                                <div className="course-meta">
                                    <span className="meta-pill">{course.level}</span>
                                    <span className="meta-pill">{course.duration}</span>
                                    <span className="meta-pill">{course.modules}</span>
                                </div>

                                <a href="#" className="course-cta" style={{ '--cta-color': course.accent }}>
                                    <span className="cta-text">Enroll Now →</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                <div className="slider-dots">
                    {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`dot${i === index ? ' active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default CourseSlider;
