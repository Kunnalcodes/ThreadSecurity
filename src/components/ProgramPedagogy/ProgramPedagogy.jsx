import { useRef, useEffect, useState } from 'react';
import {
    BookOpen, Monitor, Wrench, Users, Trophy, Briefcase,
    FlaskConical, MessageSquare, FileCheck, Rocket
} from 'lucide-react';
import './ProgramPedagogy.css';

const PILLARS = [
    {
        Icon: Monitor,
        title: 'Live Online Interactive Sessions',
        desc: 'Expert-led live classes with real-time Q&A, whiteboard demonstrations, and collaborative exercises delivered by Thread Security industry practitioners.',
        color: 'lime',
    },
    {
        Icon: Wrench,
        title: 'Hands-On Practical Labs',
        desc: 'Every concept is reinforced through practical lab exercises using Kali Linux, Metasploitable, Wireshark and other professional-grade tools in sandboxed environments.',
        color: 'green',
    },
    {
        Icon: FlaskConical,
        title: 'Live Demonstrations',
        desc: 'Watch real attack and defense scenarios unfold in real-time. Instructors demonstrate actual exploitation techniques and defensive countermeasures as they happen.',
        color: 'teal',
    },
    {
        Icon: Trophy,
        title: 'Real-World Projects',
        desc: 'Capstone projects modeled on real enterprise security challenges — from vulnerability assessments to threat hunting reports that go directly into your portfolio.',
        color: 'yellow',
    },
    {
        Icon: MessageSquare,
        title: 'Doubt Resolution via LMS',
        desc: 'Dedicated mentoring support through our Learning Management System. Get answers within hours, access recorded sessions, and review material at your own pace.',
        color: 'pink',
    },
    {
        Icon: Briefcase,
        title: 'Placement & Career Support',
        desc: 'Resume reviews, mock interviews, LinkedIn profile optimization, and direct referrals to our partner network of PwC, BugThrive, BrightXR, and more.',
        color: 'orange',
    },
];

const STEPS = [
    { num: '01', label: 'Concept Learning', sub: 'Theory + industry context' },
    { num: '02', label: 'Live Demo', sub: 'Instructor-led walkthrough' },
    { num: '03', label: 'Hands-On Lab', sub: 'Guided practical exercise' },
    { num: '04', label: 'Project Build', sub: 'Real-world application' },
    { num: '05', label: 'Assessment', sub: 'Skill validation quiz' },
    { num: '06', label: 'Certification', sub: 'Thread Security credential' },
];

function PillarCard({ pillar, index }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.12 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const { Icon, title, desc, color } = pillar;
    return (
        <div
            ref={ref}
            className={`pp-pillar pp-pillar--${color} ${visible ? 'pp-pillar--in' : ''}`}
            style={{ '--delay': `${index * 0.08}s` }}
        >
            <div className="pp-pillar-top" />
            <div className={`pp-pillar-icon pp-icon--${color}`}>
                <Icon size={22} strokeWidth={2} />
            </div>
            <h4 className="pp-pillar-title">{title}</h4>
            <p className="pp-pillar-desc">{desc}</p>
        </div>
    );
}

export default function ProgramPedagogy() {
    const [stepVisible, setStepVisible] = useState(false);
    const stepRef = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStepVisible(true); },
            { threshold: 0.1 }
        );
        if (stepRef.current) obs.observe(stepRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="pedagogy" className="pp-section">
            {/* Background orbs */}
            <div className="pp-orb pp-orb-1" aria-hidden="true" />
            <div className="pp-orb pp-orb-2" aria-hidden="true" />

            <div className="pp-inner">
                {/* Header */}
                <div className="pp-header">
                    <div className="pp-label">
                        <BookOpen size={13} />
                        Program Pedagogy
                    </div>
                    <h2 className="pp-title">
                        How We <span className="pp-grad">Teach</span>
                    </h2>
                    <p className="pp-sub">
                        This 6-month program, designed by Thread Security industry experts, is structured to
                        align closely with current cybersecurity job market requirements. The objective is to help
                        learners build a strong foundation while preparing them for the roles they aspire to achieve.
                    </p>
                    <div className="pp-description-card">
                        <div className="pp-desc-accent" />
                        <p>
                            Participants will learn core concepts and advanced tools through <strong>live online interactive
                            sessions</strong>. The program emphasizes hands-on learning through practical exercises, live
                            demonstrations, and real-world projects — ensuring learners understand the complete application
                            of cybersecurity tools and technologies.
                        </p>
                    </div>
                </div>

                {/* 6 Pillars grid */}
                <div className="pp-pillars-grid">
                    {PILLARS.map((p, i) => (
                        <PillarCard key={i} pillar={p} index={i} />
                    ))}
                </div>

                {/* Learning Flow — horizontal step timeline */}
                <div ref={stepRef} className={`pp-steps-section ${stepVisible ? 'pp-steps--in' : ''}`}>
                    <h3 className="pp-steps-heading">
                        <Rocket size={18} className="pp-steps-icon" />
                        Learning Flow
                    </h3>
                    <div className="pp-steps">
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                className="pp-step"
                                style={{ '--step-delay': `${i * 0.1}s` }}
                            >
                                <div className="pp-step-num">{step.num}</div>
                                {i < STEPS.length - 1 && (
                                    <div className="pp-step-line" aria-hidden="true" />
                                )}
                                <div className="pp-step-label">{step.label}</div>
                                <div className="pp-step-sub">{step.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom stat chips */}
                <div className="pp-chips">
                    {[
                        { val: '6 Months', desc: 'Program Duration' },
                        { val: '45 Days', desc: 'Intensive Internship' },
                        { val: '8 Phases', desc: 'CEH-Mapped Modules' },
                        { val: '50+ Labs', desc: 'Practical Sessions' },
                        { val: '100%', desc: 'Hands-On Learning' },
                    ].map(({ val, desc }) => (
                        <div key={val} className="pp-chip">
                            <span className="pp-chip-val">{val}</span>
                            <span className="pp-chip-desc">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
