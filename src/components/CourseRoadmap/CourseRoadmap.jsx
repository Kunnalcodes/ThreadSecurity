import { useRef, useEffect, useState } from 'react';
import {
    Layers, Network, Shield, Eye, Terminal, Target, Award
} from 'lucide-react';
import './CourseRoadmap.css';

const ICON_MAP = { Layers, Network, Shield, Eye, Terminal, Target, Award };

const TIMELINE = [
    {
        week: 'Week 1–2', title: 'Foundation Sprint', icon: 'Layers',
        desc: 'Cyber basics, networking fundamentals, Linux setup, Python for security essentials.',
    },
    {
        week: 'Week 3–4', title: 'Network Mastery', icon: 'Network',
        desc: 'Switching, routing, DNS/DHCP/NAT, Wireshark packet analysis, and subnetting.',
    },
    {
        week: 'Week 5–6', title: 'CEH Core Modules', icon: 'Shield',
        desc: 'Security principles, ethical hacking lifecycle, CIA Triad, and malware behavior.',
    },
    {
        week: 'Week 7–8', title: 'Recon & OSINT', icon: 'Eye',
        desc: 'Footprinting, Shodan, Google dorking, passive/active reconnaissance techniques.',
    },
    {
        week: 'Week 9–10', title: 'Attack Techniques', icon: 'Terminal',
        desc: 'Vulnerability scanning, password attacks, Hydra, Hashcat, Nessus, and OWASP ZAP.',
    },
    {
        week: 'Week 11–12', title: 'Threat Intelligence', icon: 'Target',
        desc: 'Threat hunting methodologies, malware analysis basics, IOC identification and response.',
    },
    {
        week: 'Final Days', title: 'Capstone & Placement', icon: 'Award',
        desc: 'Live project defense, certification prep, placement assistance with partner network.',
    },
];

function TLItem({ item, index, total }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.18 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const Icon = ICON_MAP[item.icon] || Shield;
    const isLast = index === total - 1;

    return (
        <div
            ref={ref}
            className={`cr-item ${visible ? 'cr-item--vis' : ''}`}
            style={{ '--delay': `${index * 0.11}s` }}
        >
            <div className="cr-connector">
                <div className="cr-dot" aria-hidden="true">
                    <Icon size={14} strokeWidth={2.5} style={{ color: '#050810' }} />
                </div>
                {!isLast && <div className="cr-line" aria-hidden="true" />}
            </div>
            <div className="cr-content">
                <span className="cr-week">{item.week}</span>
                <h4 className="cr-item-title">{item.title}</h4>
                <p className="cr-item-desc">{item.desc}</p>
            </div>
        </div>
    );
}

export default function CourseRoadmap() {
    return (
        <section id="roadmap" className="cr-section">
            <div className="cr-inner">
                <div className="cr-label cr-label--purple">
                    <Target size={13} />
                    45-Day Roadmap
                </div>
                <h2 className="cr-title">
                    Your Learning <span className="cr-grad">Journey</span>
                </h2>
                <p className="cr-sub">
                    Week-by-week breakdown of how the 45-day internship + summer training program unfolds.
                    Every sprint is designed to compound your skills.
                </p>

                <div className="cr-timeline">
                    {TIMELINE.map((item, i) => (
                        <TLItem key={i} item={item} index={i} total={TIMELINE.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}
