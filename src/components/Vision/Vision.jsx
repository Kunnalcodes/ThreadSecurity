import { useEffect, useRef, useState } from 'react';
import './Vision.css';

const stats = [
    { target: 12000, suffix: '+', label: 'Students Enrolled' },
    { target: 98, suffix: '%', label: 'Job Placement Rate' },
    { target: 240, suffix: '+', label: 'Live Labs & Modules' },
    { target: 40, suffix: '+', label: 'Industry Partners' },
];

const pillars = [
    { title: 'Real-World Readiness', desc: 'Every lab mirrors enterprise environments with live threat simulations.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Offensive Thinking', desc: 'We teach defenders to think like attackers and build resilient systems.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { title: 'AI-Augmented Learning', desc: 'Adaptive AI adjusts your learning path in real time for maximum mastery.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

function Vision() {
    const statsRowRef = useRef(null);
    const [counted, setCounted] = useState(false);
    const [counters, setCounters] = useState(stats.map(() => 0));

    // Counter animation
    useEffect(() => {
        if (counted || !statsRowRef.current) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            obs.disconnect();
            setCounted(true);
            const dur = 1800;
            const start = performance.now();
            const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            function step(ts) {
                const p = Math.min((ts - start) / dur, 1);
                setCounters(stats.map(s => Math.round(ease(p) * s.target)));
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }, { threshold: 0.3 });
        obs.observe(statsRowRef.current);
        return () => obs.disconnect();
    }, [counted]);

    return (
        <section className="vision-section" id="vision">
            <div className="vision-content">
                {/* Header */}
                <header className="vision-header">
                    <div className="vision-badge">Our Mission</div>
                    <h2>Forging the Next Generation<br />of <span>Cyber Defenders</span></h2>
                    <p>We combine battle-tested curriculum, live threat labs, and expert mentorship to turn ambition into mastery — closing the global cybersecurity skills gap one elite defender at a time.</p>
                </header>

                {/* Stat Counters */}
                <div className="stats-row" ref={statsRowRef}>
                    {stats.map((s, i) => (
                        <div className="stat-card" key={s.label}>
                            <div className="stat-value">{counters[i].toLocaleString()}{s.suffix}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Pillars */}
                <div className="pillars-grid">
                    {pillars.map((p) => (
                        <div className="pillar-card" key={p.title}>
                            <div className="pillar-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="28" height="28">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                                </svg>
                            </div>
                            <h4>{p.title}</h4>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Manifesto */}
                <div className="manifesto">
                    <div className="manifesto-quote">&ldquo;</div>
                    <blockquote>
                        The next generation of defenders will not learn security from textbooks. They will earn it — under pressure, inside live attack scenarios, guided by those who have already been on the front lines.
                    </blockquote>
                    <p className="manifesto-author">— Founder, Thread Security</p>
                </div>
            </div>
        </section>
    );
}

export default Vision;
