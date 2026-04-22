import { useState, useEffect, useRef } from 'react';
import {
    Shield, Zap, Terminal, Award, Briefcase, ArrowRight,
    Play, ChevronDown, Clock, Globe, Calendar, Users, Target
} from 'lucide-react';
import './CourseHero.css';

const STAT_ORBS = [
    { num: '45', label: 'Days' },
    { num: '8', label: 'Phases' },
    { num: '50+', label: 'Labs' },
];

const PILLS = [
    { Icon: Shield, text: 'CEH Aligned' },
    { Icon: Terminal, text: 'Kali Linux Labs' },
    { Icon: Award, text: 'Certification Prep' },
    { Icon: Briefcase, text: 'Placement Support' },
];

const STRIP_ITEMS = [
    { Icon: Clock, label: 'Duration', val: '45 Days' },
    { Icon: Globe, label: 'Mode', val: 'Online Live' },
    { Icon: Calendar, label: 'Effort', val: '~4 hrs/day' },
    { Icon: Users, label: 'Instructors', val: 'Industry Experts' },
    { Icon: Target, label: 'Goal', val: 'Job-Ready Skills' },
];

function ParticleField() {
    const particles = Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 19 + 3) % 100}%`,
        top: `${(i * 27 + 7) % 100}%`,
        delay: `${i * 0.38}s`,
        dur: `${3 + (i % 4)}s`,
        size: `${2 + (i % 3)}px`,
    }));
    return (
        <div className="ch-particles" aria-hidden="true">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="ch-particle"
                    style={{
                        left: p.left, top: p.top,
                        animationDelay: p.delay, animationDuration: p.dur,
                        width: p.size, height: p.size,
                    }}
                />
            ))}
        </div>
    );
}

function ScrollProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const h = () => {
            const el = document.documentElement;
            setP(el.scrollTop / (el.scrollHeight - el.clientHeight));
        };
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    return (
        <div
            className="ch-scroll-progress"
            style={{ width: `${p * 100}%` }}
            role="progressbar"
            aria-valuenow={Math.round(p * 100)}
        />
    );
}

export default function CourseHero() {
    const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <>
            <ScrollProgress />
            <section id="hero" className="ch-hero">
                {/* Background layers */}
                <div className="ch-bg-radial" aria-hidden="true" />
                <div className="ch-bg-grid" aria-hidden="true" />
                <ParticleField />

                <div className="ch-inner">
                    {/* Badge */}
                    <div className="ch-badge">
                        <Zap size={13} className="ch-badge-icon" />
                        <span>45-Day Intensive Internship + Summer Training</span>
                    </div>

                    {/* Glassmorphism Card */}
                    <div className="ch-glass-card">
                        <div className="ch-glow ch-glow-1" aria-hidden="true" />
                        <div className="ch-glow ch-glow-2" aria-hidden="true" />

                        <div className="ch-title-row">
                            <div className="ch-title-copy">
                                <p className="ch-sub-label">Advanced Certification Program in</p>
                                <h1 className="ch-main-title">
                                    Cyber<span className="ch-gradient-text">Security</span>
                                </h1>
                                <p className="ch-desc">
                                    Industry-aligned, hands-on cybersecurity training powered by Thread Security — covering
                                    CEH-mapped modules, live labs, and real-world attack &amp; defense scenarios across 45 days.
                                </p>
                            </div>

                            <div className="ch-stat-orbs" aria-label="Program statistics">
                                {STAT_ORBS.map(({ num, label }) => (
                                    <div key={label} className="ch-stat-orb">
                                        <span className="ch-stat-num">{num}</span>
                                        <span className="ch-stat-label">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pills */}
                        <div className="ch-pills">
                            {PILLS.map(({ Icon, text }) => (
                                <div key={text} className="ch-pill">
                                    <Icon size={13} className="ch-pill-icon" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="ch-actions">
                            <button className="ch-btn-primary" onClick={() => go('enroll')}>
                                <Play size={15} />
                                Enroll Now
                            </button>
                            <button className="ch-btn-ghost" onClick={() => go('curriculum')}>
                                Explore Curriculum
                                <ChevronDown size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Strip */}
                    <div className="ch-strip">
                        {STRIP_ITEMS.map(({ Icon, label, val }) => (
                            <div key={label} className="ch-strip-item">
                                <Icon size={17} className="ch-strip-icon" />
                                <div>
                                    <span className="ch-strip-label">{label}</span>
                                    <span className="ch-strip-val">{val}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
