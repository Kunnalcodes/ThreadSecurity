import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Lock, User, Mail, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './RegistrationPage.css';

/* ── Helpers ── */
const emailRx  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRx  = /^\+?[0-9]{8,15}$/;

function calcStrength(pw) {
    let s = 0;
    if (pw.length >= 8)              s += 20;
    if (/[0-9]/.test(pw))           s += 20;
    if (/[^A-Za-z0-9]/.test(pw))    s += 20;
    if (/[A-Z]/.test(pw))           s += 20;
    if (/[a-z]/.test(pw))           s += 20;
    return s;
}

function strengthLabel(s) {
    if (s < 40)  return { label: 'Weak',   color: '#e74c3c' };
    if (s < 80)  return { label: 'Medium', color: '#f39c12' };
    return               { label: 'Strong', color: '#5dd62c' };
}

export default function RegistrationPage() {
    const { theme } = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
    });
    const [touched, setTouched]       = useState({});
    const [showPw, setShowPw]         = useState(false);
    const [showCpw, setShowCpw]       = useState(false);
    const [terms, setTerms]           = useState(false);
    const [submitted, setSubmitted]   = useState(false);
    const [success, setSuccess]       = useState(false);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading]       = useState(false);
    const formRef                     = useRef(null);

    const strength  = calcStrength(form.password);
    const { label: strengthLbl, color: strengthColor } = strengthLabel(strength);

    /* ── Field errors ── */
    const errors = {
        firstName:       form.firstName.trim() === ''       ? 'First name is required' : null,
        lastName:        form.lastName.trim() === ''        ? 'Last name is required'  : null,
        email:           !emailRx.test(form.email)          ? 'Enter a valid email address' : null,
        phone:           !phoneRx.test(form.phone)          ? 'Enter a valid phone number'  : null,
        password:        form.password.length < 8           ? 'Password must be ≥ 8 characters' : null,
        confirmPassword: form.confirmPassword !== form.password ? 'Passwords do not match' : null,
    };

    const isFormValid = Object.values(errors).every(e => e === null) && terms;

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleBlur(e) {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    }

    function showError(field) {
        return (touched[field] || submitted) && errors[field];
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        setServerError('');
        if (!isFormValid) return;
        setLoading(true);
        const result = await register({
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
            confirm_password: form.confirmPassword,
        });
        setLoading(false);
        if (result.ok) {
            setSuccess(true);
            setTimeout(() => navigate('/profile', { replace: true }), 1500);
        } else {
            const errs = result.errors || {};
            setServerError(errs.email?.[0] || errs.general || 'Registration failed.');
        }
    }

    return (
        <div className="reg-page" data-theme={theme}>
            {/* ── Background mesh ── */}
            <div className="reg-bg-mesh" aria-hidden="true">
                <div className="reg-blob reg-blob--1" />
                <div className="reg-blob reg-blob--2" />
                <div className="reg-blob reg-blob--3" />
            </div>

            <div className="reg-wrapper">
                {/* ── Left panel ── */}
                <aside className="reg-panel">
                    <Link to="/" className="reg-panel__logo">
                        <ShieldCheck size={28} />
                        <span>Thread Security</span>
                    </Link>

                    <div className="reg-panel__body">
                        <h2 className="reg-panel__tagline">
                            Level up your<br /><em>cyber skills</em>
                        </h2>
                        <p className="reg-panel__sub">
                            Join thousands of professionals mastering ethical hacking, penetration testing, AI security, and more.
                        </p>

                        <ul className="reg-panel__perks">
                            {[
                                'Industry-recognized certifications',
                                'Live mentor sessions & bootcamps',
                                'Real-world lab environments',
                                'Lifetime access to course updates',
                            ].map(p => (
                                <li key={p}>
                                    <CheckCircle2 size={16} />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="reg-panel__footer">
                        © {new Date().getFullYear()} Thread Security Academy
                    </p>
                </aside>

                {/* ── Form card ── */}
                <main className="reg-card">
                    <div className="reg-card__header">
                        <h1 className="reg-card__title">Create account</h1>
                        <p className="reg-card__sub">
                            Already have an account?{' '}
                            <Link to="/login" className="reg-card__link">Sign in</Link>
                        </p>
                    </div>

                    {serverError && (
                        <div className="reg-success" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.28)', color: '#ef4444' }}>
                            <AlertCircle size={20} />
                            <span>{serverError}</span>
                        </div>
                    )}

                    {success && (
                        <div className="reg-success">
                            <CheckCircle2 size={20} />
                            <span>Account created! Redirecting to profile… 🎉</span>
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="reg-form">
                        {/* Row: first / last name */}
                        <div className="reg-row">
                            <Field
                                label="First Name" name="firstName" type="text"
                                icon={<User size={16} />} value={form.firstName}
                                onChange={handleChange} onBlur={handleBlur}
                                error={showError('firstName')} placeholder="Alex"
                            />
                            <Field
                                label="Last Name" name="lastName" type="text"
                                icon={<User size={16} />} value={form.lastName}
                                onChange={handleChange} onBlur={handleBlur}
                                error={showError('lastName')} placeholder="Carter"
                            />
                        </div>

                        {/* Email */}
                        <Field
                            label="Email Address" name="email" type="email"
                            icon={<Mail size={16} />} value={form.email}
                            onChange={handleChange} onBlur={handleBlur}
                            error={showError('email')} placeholder="alex@company.com"
                        />

                        {/* Phone */}
                        <Field
                            label="Phone Number" name="phone" type="tel"
                            icon={<Phone size={16} />} value={form.phone}
                            onChange={handleChange} onBlur={handleBlur}
                            error={showError('phone')} placeholder="+91 98765 43210"
                        />

                        {/* Password */}
                        <div className="reg-field-group">
                            <label className="reg-label" htmlFor="password">Password</label>
                            <div className={`reg-input-wrap ${showError('password') ? 'error' : ''}`}>
                                <span className="reg-input-icon"><Lock size={16} /></span>
                                <input
                                    id="password" name="password"
                                    type={showPw ? 'text' : 'password'}
                                    className="reg-input" value={form.password}
                                    onChange={handleChange} onBlur={handleBlur}
                                    placeholder="Min. 8 characters"
                                    autoComplete="new-password"
                                />
                                <button type="button" className="reg-pw-toggle" onClick={() => setShowPw(p => !p)} aria-label="Toggle password visibility">
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {/* Strength meter */}
                            {form.password.length > 0 && (
                                <div className="reg-strength">
                                    <div className="reg-strength__bar-track">
                                        <div
                                            className="reg-strength__bar-fill"
                                            style={{ width: `${strength}%`, backgroundColor: strengthColor }}
                                        />
                                    </div>
                                    <span className="reg-strength__label" style={{ color: strengthColor }}>
                                        {strengthLbl}
                                    </span>
                                </div>
                            )}

                            {showError('password') && (
                                <p className="reg-error"><AlertCircle size={13} />{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="reg-field-group">
                            <label className="reg-label" htmlFor="confirmPassword">Confirm Password</label>
                            <div className={`reg-input-wrap ${showError('confirmPassword') ? 'error' : ''}`}>
                                <span className="reg-input-icon"><Lock size={16} /></span>
                                <input
                                    id="confirmPassword" name="confirmPassword"
                                    type={showCpw ? 'text' : 'password'}
                                    className="reg-input" value={form.confirmPassword}
                                    onChange={handleChange} onBlur={handleBlur}
                                    placeholder="Re-enter password"
                                    autoComplete="new-password"
                                />
                                <button type="button" className="reg-pw-toggle" onClick={() => setShowCpw(p => !p)} aria-label="Toggle confirm password visibility">
                                    {showCpw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {showError('confirmPassword') && (
                                <p className="reg-error"><AlertCircle size={13} />{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <label className="reg-terms">
                            <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
                            <span>
                                I agree to the{' '}
                                <a href="#" className="reg-card__link">Terms & Conditions</a>
                                {' '}and{' '}
                                <a href="#" className="reg-card__link">Privacy Policy</a>
                            </span>
                        </label>
                        {submitted && !terms && (
                            <p className="reg-error"><AlertCircle size={13} />You must agree to the terms</p>
                        )}

                        <button type="submit" id="reg-submit-btn" className="reg-submit glare-hover" disabled={loading}>
                            {loading
                                ? <><Loader2 size={16} style={{ animation: 'enqSpinAnim 0.8s linear infinite' }} /> Creating account…</>
                                : 'Create Account'
                            }
                        </button>
                    </form>

                    <p className="reg-secure-note">
                        <Lock size={12} />
                        Your data is encrypted and never shared.
                    </p>
                </main>
            </div>
        </div>
    );
}

/* ── Reusable field ── */
function Field({ label, name, type, icon, value, onChange, onBlur, error, placeholder }) {
    return (
        <div className="reg-field-group">
            <label className="reg-label" htmlFor={name}>{label}</label>
            <div className={`reg-input-wrap ${error ? 'error' : ''}`}>
                <span className="reg-input-icon">{icon}</span>
                <input
                    id={name} name={name} type={type}
                    className="reg-input" value={value}
                    onChange={onChange} onBlur={onBlur}
                    placeholder={placeholder}
                    autoComplete={type === 'email' ? 'email' : 'off'}
                />
            </div>
            {error && <p className="reg-error"><AlertCircle size={13} />{error}</p>}
        </div>
    );
}
