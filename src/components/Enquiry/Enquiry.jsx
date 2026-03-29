import { useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../AnimatedSection/AnimatedSection';
import './Enquiry.css';

function Enquiry() {
    const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('sent');
            setForm({ name: '', email: '', company: '', interest: '', message: '' });
            setTimeout(() => setStatus('idle'), 3500);
        }, 1600);
    };

    const [copied, setCopied] = useState(false);
    const copyEmail = () => {
        navigator.clipboard.writeText('support@threadsecurity.com').then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    return (
        <section className="enq-section" id="contact">
            {/* Background decorations */}
            <div className="enq-bg-orb enq-orb-1" />
            <div className="enq-bg-orb enq-orb-2" />
            <div className="enq-bg-grid" />

            <div className="enq-wrapper">
                {/* Header */}
                <motion.header
                    className="enq-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={variants.fadeUp}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="enq-eyebrow">
                        <span className="enq-dot" />
                        Get in Touch
                    </div>
                    <h2 className="enq-title">Let's Start a Conversation</h2>
                    <p className="enq-subtitle">
                        Whether you're exploring training programs, need a custom assessment, or want to partner — we're ready to help.
                    </p>
                </motion.header>

                <div className="enq-grid">
                    {/* LEFT: Form + Mini cards */}
                    <motion.div
                        className="enq-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={variants.slideLeft}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* General Inquiry Form */}
                        <div className="enq-card">
                            <div className="enq-card-accent" />
                            <div className="enq-card-label">
                                <span className="enq-label-dot primary" />
                                General Inquiry
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="enq-form-grid">
                                    <div className="enq-field">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Alex Volkov" required />
                                    </div>
                                    <div className="enq-field">
                                        <label>Work Email</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" required />
                                    </div>
                                </div>

                                <div className="enq-form-grid">
                                    <div className="enq-field">
                                        <label>Company / Org</label>
                                        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Thread Security" />
                                    </div>
                                    <div className="enq-field">
                                        <label>I'm Interested In</label>
                                        <select name="interest" value={form.interest} onChange={handleChange}>
                                            <option value="">Select topic</option>
                                            <option value="training">Training Programs</option>
                                            <option value="enterprise">Enterprise Solutions</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="enq-field">
                                    <label>Message</label>
                                    <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell us about your goals or challenges..." />
                                </div>

                                <button
                                    className={`enq-submit ${status === 'sent' ? 'sent' : ''}`}
                                    type="submit"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'idle' && (
                                        <>
                                            Send Inquiry
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" width="16" height="16">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                    {status === 'sending' && (
                                        <>
                                            <svg className="enq-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="16" height="16">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Sending…
                                        </>
                                    )}
                                    {status === 'sent' && (
                                        <>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" width="16" height="16">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Inquiry Sent!
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Mini-cards */}
                        <div className="enq-mini-row">
                            <div className="enq-mini primary">
                                <h4>Enterprise</h4>
                                <p>Looking for team-wide training or a tailored security program for your organization.</p>
                                <button className="enq-mini-btn primary">Contact Sales <span>→</span></button>
                            </div>
                            <div className="enq-mini emerald">
                                <h4>Partnerships</h4>
                                <p>Collaborate on research, integrations, or strategic cybersecurity initiatives.</p>
                                <button className="enq-mini-btn emerald">Propose <span>→</span></button>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Support + Socials */}
                    <motion.div
                        className="enq-right"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={variants.slideRight}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Customer Support */}
                        <div className="enq-card">
                            <div className="enq-card-accent" />
                            <div className="enq-card-label">
                                <span className="enq-label-dot green" />
                                Customer Support
                            </div>
                            <p className="enq-card-text">
                                Existing client? Get priority assistance from our technical security experts — response within 4 hours.
                            </p>
                            <div className="enq-email-row">
                                <span>support@threadsecurity.com</span>
                                <button className="enq-copy-btn" onClick={copyEmail} title="Copy email">
                                    {copied ? (
                                        <svg fill="none" stroke="#22c55e" viewBox="0 0 24 24" strokeWidth="2.5" width="15" height="15">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="15" height="15">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="enq-divider" />
                            <div className="enq-status-row">
                                <div className="enq-status-item">
                                    <span className="enq-online-dot" />
                                    Online Now
                                </div>
                                <div className="enq-status-item">
                                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                                    </svg>
                                    &lt; 4h response SLA
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="enq-card">
                            <div className="enq-card-label">
                                <span className="enq-label-dot emerald" />
                                Social Media
                            </div>
                            <p className="enq-card-text">
                                Follow our research labs and stay current on threat intelligence, tooling releases, and cohort news.
                            </p>
                            <div className="enq-social-row">
                                <a className="enq-soc li" href="#" aria-label="LinkedIn">
                                    <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a className="enq-soc tw" href="#" aria-label="X / Twitter">
                                    <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a className="enq-soc gh" href="#" aria-label="GitHub">
                                    <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Tagline */}
                        <div className="enq-tagline">
                            <p>Your journey starts with a conversation.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Enquiry;
