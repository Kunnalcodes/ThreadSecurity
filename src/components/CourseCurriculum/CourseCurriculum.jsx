import { useState, useRef, useEffect } from 'react';
import {
    Shield, Network, Layers, Terminal, Lock, Eye,
    Cpu, Search, Code, ChevronDown
} from 'lucide-react';
import './CourseCurriculum.css';

const ICON_MAP = { Shield, Network, Layers, Terminal, Lock, Eye, Cpu, Search, Code };

const phases = [
    {
        id: 'P1', icon: 'Shield', color: '#5dd62c',
        title: 'Introduction to Cyber Security',
        topics: [
            'Basics of cyber security', 'Importance of data & system protection',
            'Common cyber threats', 'Role of coding in security',
            'Python for beginners', 'Networking fundamentals',
            'Linux basics for security', 'Encryption concepts',
            'Hashing for passwords', 'Attack detection basics',
        ],
    },
    {
        id: 'P2', icon: 'Network', color: '#afff00',
        title: 'Networking Basics (Industry Level)',
        topics: [
            'OSI Model (with real-world examples)', 'TCP/IP Model',
            'IP Addressing', 'Subnetting basics',
            'TCP vs UDP', 'Common ports & protocols (SSH, HTTPS, DNS, DHCP, FTP)',
        ],
    },
    {
        id: 'P3', icon: 'Layers', color: '#4ade80',
        title: 'Switching + Routing + DNS/DHCP/NAT',
        topics: [
            'Switch working, CAM Table', 'VLAN',
            'Routing basics (static, default, dynamic)', 'DNS working (step-by-step)',
            'DHCP leasing', 'NAT types', 'Wireshark basics', 'Packet analysis',
        ],
    },
    {
        id: 'P4', icon: 'Terminal', color: '#facc15',
        title: 'Linux Essentials Lab Setup',
        topics: [
            'Kali Linux, Metasploitable2', 'Linux file system structure',
            'Essential commands', 'Basics of shell scripting',
            'Managing services, users, and networking', 'File permissions and SUID/SGID',
        ],
    },
    {
        id: 'P5', icon: 'Lock', color: '#f87171',
        title: 'Fundamentals of Cybersecurity (CEH Aligned)',
        topics: [
            'Core security principles (CIA Triad)', 'Types of cyber attacks',
            'Threats, vulnerabilities, and risk management', 'Layered security (Defense in Depth)',
            'Malware categories and behavior', 'Ethical hacking vs malicious hacking',
            'Hacking lifecycle (recon to exploitation)',
        ],
    },
    {
        id: 'P6', icon: 'Eye', color: '#22d3ee',
        title: 'Footprinting & Reconnaissance (CEH)',
        topics: [
            'Footprinting concepts & types', 'Passive vs Active reconnaissance',
            'WHOIS & DNS enumeration', 'Google Dorking (GHDB)',
            'Shodan for OSINT', 'Username reconnaissance (Sherlock)',
            'Website mirroring (HTTrack)',
        ],
    },
    {
        id: 'P7', icon: 'Cpu', color: '#a78bfa',
        title: 'Vulnerability Analysis, System Hacking & Password Attacks',
        topics: [
            'Vulnerability concepts & assessment', 'CVSS, CVE, NVD, CWE',
            'Vulnerability scanning tools (Nikto, OpenVAS, OWASP ZAP, Nessus)',
            'Password cracking techniques', 'Hashing (MD5, SHA, Bcrypt)',
            'Pass-the-Hash attacks', 'Brute force & dictionary attacks',
            'Tools (Hydra, John, Hashcat)',
        ],
    },
    {
        id: 'P8', icon: 'Search', color: '#fb923c',
        title: 'Threat Hunting & Malware Analysis',
        topics: [
            'Introduction to threat hunting', 'Types of threats & malware behavior',
            'Threat hunting methodologies', 'Indicators of Compromise (IOCs)',
            'Log analysis for threat detection', 'Malware analysis basics (static)',
            'Obfuscation techniques (basics)', 'Identifying suspicious activities',
        ],
    },
];

function PhaseCard({ phase, index }) {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const Icon = ICON_MAP[phase.icon] || Shield;

    return (
        <div
            ref={ref}
            className={`cc-phase ${visible ? 'cc-phase--in' : ''} ${index % 2 !== 0 ? 'cc-phase--right' : ''}`}
            style={{ '--delay': `${index * 0.065}s`, '--accent': phase.color }}
        >
            <button className="cc-phase-header" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span className="cc-phase-id">{phase.id}</span>
                <span className="cc-phase-icon-wrap">
                    <Icon size={19} style={{ color: phase.color }} strokeWidth={2} />
                </span>
                <div className="cc-phase-meta">
                    <span className="cc-phase-title">{phase.title}</span>
                    <span className="cc-phase-count">{phase.topics.length} topics</span>
                </div>
                <ChevronDown
                    size={17}
                    className={`cc-chevron ${open ? 'cc-chevron--open' : ''}`}
                    style={{ color: phase.color }}
                />
            </button>

            <div className={`cc-phase-body ${open ? 'cc-phase-body--open' : ''}`}>
                <ul className="cc-topic-list">
                    {phase.topics.map((t, i) => (
                        <li key={i} className="cc-topic-item">
                            <span className="cc-topic-dot" style={{ background: phase.color }} />
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function CourseCurriculum() {
    return (
        <section id="curriculum" className="cc-section">
            <div className="cc-inner">
                <div className="cc-label">
                    <Code size={13} />
                    8-Phase Curriculum
                </div>
                <h2 className="cc-title">
                    Program <span className="cc-grad">Curriculum</span>
                </h2>
                <p className="cc-sub">
                    A progressive, skill-stacked learning path from absolute beginner to CEH-ready professional.
                    Each phase builds directly on the last.
                </p>

                <div className="cc-phases">
                    {phases.map((p, i) => (
                        <PhaseCard key={p.id} phase={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
