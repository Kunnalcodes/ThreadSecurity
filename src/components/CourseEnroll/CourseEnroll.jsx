import { useState, useRef } from 'react';
import { Check, ArrowRight, Zap, Clock, Phone, Mail, Link2 } from 'lucide-react';
import { readResponseJson, userFacingHttpMessage } from '../../utils/httpError';
import './CourseEnroll.css';

const INCLUDES = [
    '8-Phase CEH-aligned curriculum',
    'Live online interactive sessions',
    'Hands-on lab environment access',
    'Doubt resolution via LMS',
    'Real-world capstone project',
    'Thread Security certification',
    'Placement assistance support',
    'AI Certification Prep (Azure / Google / IBM)',
];

const STATS = [
    { num: '45', label: 'Days' },
    { num: '8', label: 'Phases' },
    { num: '4hrs', label: '/day' },
];

export default function CourseEnroll() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', interest: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [errorMessage, setErrorMessage] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const exportToExcel = (data) => {
        // Build a CSV string (opens in Excel)
        const headers = ['Name', 'Email', 'Phone', 'College/Company', 'Interest', 'Submitted At'];
        const row = [
            data.name, data.email, data.phone, data.college, data.interest,
            new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        ];

        // Escape any commas inside fields
        const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
        const csv = [headers.map(escape).join(','), row.map(escape).join(',')].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `thread-security-enrollment-${Date.now()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    message: "Course Enrollment Request"
                }),
            });

            const data = await readResponseJson(response);

            if (response.ok) {
                exportToExcel(form);
                setStatus('sent');
                setForm({ name: '', email: '', phone: '', college: '', interest: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                setStatus('error');
                const msg = response.status === 429
                    ? userFacingHttpMessage(429, data)
                    : (data.message || 'Submission failed. Please try again.');
                setErrorMessage(msg);
                setTimeout(() => { setStatus('idle'); setErrorMessage(''); }, 6000);
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection.');
            setTimeout(() => { setStatus('idle'); setErrorMessage(''); }, 6000);
        }
    };

    return (
        <section id="enroll" className="ce-section">
            <div className="ce-inner">
                <div className="ce-glass">
                    {/* Ambient glows */}
                    <div className="ce-glow ce-glow-1" aria-hidden="true" />
                    <div className="ce-glow ce-glow-2" aria-hidden="true" />

                    {/* LEFT — includes + contact */}
                    <div className="ce-left">
                        <div className="ce-label">
                            <Zap size={13} />
                            Enrollment
                        </div>
                        <h2 className="ce-title">
                            Start Your <span className="ce-grad">45-Day</span> Journey
                        </h2>
                        <p className="ce-desc">
                            Join Thread Security's Advanced Cybersecurity Internship + Summer Training.
                            Limited seats available for the next cohort — apply now.
                        </p>

                        <div className="ce-includes">
                            <h4 className="ce-includes-heading">What's Included</h4>
                            {INCLUDES.map(item => (
                                <div key={item} className="ce-include-item">
                                    <Check size={13} className="ce-check" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Quick contact */}
                        <div className="ce-contact">
                            <div className="ce-contact-row">
                                <Phone size={15} className="ce-contact-icon" />
                                <div>
                                    <span>+91 9988877658</span>
                                    <span>+91 7347398956</span>
                                </div>
                            </div>
                            <div className="ce-contact-row">
                                <Mail size={15} className="ce-contact-icon ce-contact-icon--purple" />
                                <span>info@threadsecurity.org</span>
                            </div>
                            <div className="ce-contact-row">
                                <Link2 size={15} className="ce-contact-icon ce-contact-icon--green" />
                                <span>threadsecurity.org</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — enrollment form */}
                    <div className="ce-right">
                        <div className="ce-form-card">
                            <h3 className="ce-form-title">Apply for Next Cohort</h3>

                            {/* Mini stats */}
                            <div className="ce-stats-strip">
                                {STATS.map(({ num, label }) => (
                                    <div key={label} className="ce-stat-item">
                                        <span className="ce-stat-num">{num}</span>
                                        <span className="ce-stat-label">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="ce-field-row">
                                    <div className="ce-field">
                                        <label>Full Name</label>
                                        <input
                                            type="text" name="name" required
                                            value={form.name} onChange={handleChange}
                                            placeholder="Arjun Mehta"
                                        />
                                    </div>
                                    <div className="ce-field">
                                        <label>Email</label>
                                        <input
                                            type="email" name="email" required
                                            value={form.email} onChange={handleChange}
                                            placeholder="arjun@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="ce-field-row">
                                    <div className="ce-field">
                                        <label>Phone</label>
                                        <input
                                            type="tel" name="phone"
                                            value={form.phone} onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                    <div className="ce-field">
                                        <label>College / Company</label>
                                        <input
                                            type="text" name="college"
                                            value={form.college} onChange={handleChange}
                                            placeholder="XYZ University"
                                        />
                                    </div>
                                </div>

                                <div className="ce-field">
                                    <label>I'm Interested In</label>
                                    <select name="interest" value={form.interest} onChange={handleChange}>
                                        <option value="">Select program</option>
                                        <option value="45-day-internship">45-Day Cybersecurity Internship</option>
                                        <option value="summer-training">Summer Training</option>
                                        <option value="ceh-prep">CEH Certification Prep</option>
                                        <option value="corporate">Corporate Training</option>
                                    </select>
                                </div>

                                {status === 'error' && errorMessage && (
                                    <p className="ce-error" role="alert">{errorMessage}</p>
                                )}

                                <button
                                    type="submit"
                                    className={`ce-submit ${status === 'sent' ? 'ce-submit--sent' : ''}`}
                                    disabled={status === 'sending'}
                                >
                                    {status === 'idle' && (
                                        <>
                                            <ArrowRight size={15} />
                                            Apply & Download Confirmation
                                        </>
                                    )}
                                    {status === 'sending' && (
                                        <>
                                            <svg className="ce-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="15" height="15">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Processing...
                                        </>
                                    )}
                                    {status === 'sent' && (
                                        <>
                                            <Check size={15} />
                                            Application Submitted!
                                        </>
                                    )}
                                </button>

                                <p className="ce-note">
                                    <Clock size={11} />
                                    Limited seats · Online · Summer 2025 Cohort
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
