import { Cpu, Terminal, Briefcase, Users, Shield, Award } from 'lucide-react';
import './CourseOverview.css';

const CARDS = [
    {
        Icon: Cpu,
        title: 'CEH-Mapped Syllabus',
        desc: 'Curriculum designed to align with Certified Ethical Hacker objectives and current industry standards.',
        color: 'lime',
    },
    {
        Icon: Terminal,
        title: 'Hands-On Labs',
        desc: 'Real lab environments using Kali Linux, Metasploitable2, Wireshark, and industry-grade security tools.',
        color: 'green',
    },
    {
        Icon: Briefcase,
        title: 'Placement Network',
        desc: 'Backed by PwC, BugThrive, BrightXR, and more — bridging your training to real employment.',
        color: 'olive',
    },
    {
        Icon: Users,
        title: 'Expert Instructors',
        desc: "Learn from practitioners who've led security engagements at 50+ organizations worldwide.",
        color: 'pink',
    },
    {
        Icon: Shield,
        title: 'Offensive + Defensive',
        desc: 'Understand both attack techniques and defense strategies for a complete security mindset.',
        color: 'red',
    },
    {
        Icon: Award,
        title: 'Dual Certification',
        desc: 'Earn Thread Security certification and prepare for globally recognized AI/security credentials.',
        color: 'teal',
    },
];

export default function CourseOverview() {
    return (
        <section className="cov-section" id="overview">
            <div className="cov-inner">
                <div className="cov-label">
                    <span className="cov-label-dot" />
                    Program Overview
                </div>
                <h2 className="cov-title">
                    Why This <span className="cov-grad">Training?</span>
                </h2>
                <p className="cov-sub">
                    A complete 45-day immersive program designed to transform a beginner into a
                    job-ready cybersecurity professional — no prior experience required.
                </p>

                <div className="cov-grid">
                    {CARDS.map(({ Icon, title, desc, color }) => (
                        <div key={title} className={`cov-card cov-card--${color}`}>
                            <div className="cov-card-top-line" />
                            <div className={`cov-icon cov-icon--${color}`}>
                                <Icon size={22} strokeWidth={2} />
                            </div>
                            <h4 className="cov-card-title">{title}</h4>
                            <p className="cov-card-desc">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
