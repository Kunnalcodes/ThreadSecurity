import { useState } from 'react';
import { motion } from 'framer-motion';
import { variants, staggerContainer } from '../AnimatedSection/AnimatedSection';
import './Career.css';

const careers = [
    { role: 'Penetration Tester', track: 'OFFENSIVE TRACK', salary: 'Avg. $120k – $180k / yr', avgPay: 'Avg $150k/yr', demand: 92, color: 'red', skills: ['Metasploit', 'Burp Suite', 'Active Directory', 'Python'], desc: 'Legally break into enterprise systems to identify vulnerabilities before attackers do. Simulate real-world attacks using industry toolkits like Metasploit, Burp Suite, and custom exploits.' },
    { role: 'Cloud Security Engineer', track: 'INFRASTRUCTURE TRACK', salary: 'Avg. $130k – $195k / yr', avgPay: 'Avg $162k/yr', demand: 88, color: 'blue', skills: ['AWS IAM', 'Terraform', 'CSPM', 'Zero Trust'], desc: 'Design and enforce security controls across AWS, Azure, and GCP. Implement IAM hardening, zero-trust networking, and automated misconfiguration detection at cloud scale.' },
    { role: 'Bug Bounty Researcher', track: 'RESEARCH TRACK', salary: '$5k – $500k+ per report', avgPay: 'Uncapped', demand: 76, color: 'orange', skills: ['XSS / SQLi', 'SSRF', 'IDOR', 'Report Writing'], desc: 'Hunt vulnerabilities independently across HackerOne and Bugcrowd programs for Google, Meta, Tesla and more. Top hunters earn $500k+ annually from payouts alone.' },
    { role: 'DevSecOps Engineer', track: 'DEFENSE TRACK', salary: 'Avg. $125k – $175k / yr', avgPay: 'Avg $148k/yr', demand: 85, color: 'green', skills: ['GitHub Actions', 'SAST / DAST', 'Docker', 'Vault'], desc: 'Shift security left by embedding automated testing, SAST/DAST scanning, and secrets management directly into CI/CD pipelines.' },
    { role: 'AI Security Engineer', track: 'EMERGING TECH TRACK', salary: 'Avg. $155k – $220k / yr', avgPay: 'Avg $185k/yr', demand: 97, color: 'purple', skills: ['LLM Red-Teaming', 'Prompt Injection', 'RAG Security', 'Model Evals'], desc: 'Red-team LLMs, defend against prompt injection, and harden agentic pipelines. One of the fastest-growing roles in the industry.' },
    { role: 'Threat Intel Analyst', track: 'INTELLIGENCE TRACK', salary: 'Avg. $100k – $155k / yr', avgPay: 'Avg $128k/yr', demand: 80, color: 'yellow', skills: ['MITRE ATT&CK', 'OSINT', 'YARA Rules', 'Maltego'], desc: 'Monitor and analyze APT campaigns, decode adversarial TTPs using MITRE ATT&CK, and produce actionable intelligence reports.' },
    { role: 'SOC Analyst Tier 2/3', track: 'OPS TRACK', salary: 'Avg. $90k – $140k / yr', avgPay: 'Avg $115k/yr', demand: 83, color: 'slate', skills: ['Splunk', 'EDR / XDR', 'DFIR', 'SIEM'], desc: 'Lead incident response and digital forensics at the front lines of enterprise defense. Triage complex alerts, contain breaches, and author post-incident reports.' },
];

const CIRC = 163.4;

function Career() {
    const [active, setActive] = useState(0);

    const c = careers[active];
    const pct = (active + 1) / careers.length;
    const offset = CIRC * (1 - pct);

    return (
        <section className="career-section" id="career">
            <div className="career-container">
                <div className="career-grid">
                    {/* Left: Sticky Panel */}
                    <motion.div
                        className="career-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer(0.12)}
                    >
                        <motion.div className="career-badge-pill" variants={variants.fadeUp}>Career Outcomes</motion.div>
                        <motion.h2 className="career-heading" variants={variants.fadeUp}>
                            From Student to <span>Professional</span>
                        </motion.h2>
                        <motion.p className="career-desc" variants={variants.fadeUp}>
                            Our graduates don't just find jobs — they redefine the security landscape. Master the skills for the most high-impact roles in the digital frontier.
                        </motion.p>

                        {/* Active Indicator */}
                        <div className="career-indicator">
                            <div className="progress-ring-wrap">
                                <svg className="progress-svg" viewBox="0 0 64 64" width="64" height="64">
                                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(93, 214, 44, 0.2)" strokeWidth="5" />
                                    <circle
                                        className="ring-track"
                                        cx="32" cy="32" r="26" fill="none"
                                        strokeWidth="5"
                                        strokeDasharray={CIRC}
                                        strokeDashoffset={offset}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="progress-num">{active + 1}/{careers.length}</span>
                            </div>
                            <div>
                                <p className="ind-track">{c.track}</p>
                                <p className="ind-role">{c.role}</p>
                                <p className="ind-salary">{c.salary}</p>
                            </div>
                        </div>

                        {/* 94% stat */}
                        <motion.div className="career-stat-bar" variants={variants.fadeUp}>
                            <div className="career-stat-num">94%</div>
                            <p>Placement rate within 6 months of certification.</p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Cards */}
                    <motion.div
                        className="career-right"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer(0.1)}
                    >
                        {careers.map((item, i) => (
                            <motion.div
                                className={`career-card card-enter cc-${item.color}-border ${active === i ? 'is-active' : ''}`}
                                key={item.role}
                                data-index={i}
                                variants={variants.fadeUp}
                                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                                onClick={() => setActive(i)}
                            >
                                {/* Header */}
                                <div className="cc-header">
                                    <div>
                                        <span className={`cc-track cc-${item.color}`}>{item.track}</span>
                                        <h3 className={`cc-role cc-${item.color}-dark`}>{item.role}</h3>
                                    </div>
                                    <span className={`cc-pay cc-${item.color}-bg`}>{item.avgPay}</span>
                                </div>
                                <p className={`cc-desc cc-${item.color}-text`}>{item.desc}</p>

                                {/* Skills */}
                                <div className={`cc-skills cc-${item.color}-dark`}>
                                    {item.skills.map((s) => (
                                        <span className={`skill-tag skill-tag-${item.color}`} key={s}>{s}</span>
                                    ))}
                                </div>

                                {/* Demand */}
                                <div className="cc-demand">
                                    <div className={`cc-demand-head cc-${item.color}`}>
                                        <span>Market Demand</span>
                                        <span>{item.demand}%</span>
                                    </div>
                                    <div className={`cc-demand-bg cc-${item.color}-bg-light`}>
                                        <div className={`cc-demand-fill cc-${item.color}-fill`} style={{ width: `${item.demand}%` }} />
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className={`cc-cta cc-${item.color}-cta`}>
                                    <span>View Learning Roadmap →</span>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Career;