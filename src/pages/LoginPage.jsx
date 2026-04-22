import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) navigate('/profile', { replace: true });
        emailRef.current?.focus();
    }, [isAuthenticated, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(email.trim().toLowerCase(), password);
        setLoading(false);
        if (result.ok) {
            navigate('/profile', { replace: true });
        } else {
            setError(result.error || 'Login failed.');
            setPassword('');
        }
    }

    return (
        <div className="login-page">
            {/* Ambient background */}
            <div className="login-bg" aria-hidden="true">
                <div className="login-blob login-blob--1" />
                <div className="login-blob login-blob--2" />
                <div className="login-grid" />
            </div>

            <div className="login-wrapper">
                {/* Branding Panel */}
                <aside className="login-panel">
                    <Link to="/" className="login-panel__logo">
                        <ShieldCheck size={28} />
                        <span>Thread Security</span>
                    </Link>
                    <div className="login-panel__body">
                        <h2 className="login-panel__tagline">
                            Secure Access to<br /><em>Your Dashboard</em>
                        </h2>
                        <p className="login-panel__sub">
                            Your session is protected with AES-256 encrypted tokens that expire automatically and are never stored in persistent storage.
                        </p>
                        <ul className="login-panel__perks">
                            {[
                                'Zero-persistence session tokens',
                                'Brute-force lockout protection',
                                'Server-side token invalidation',
                                'Auto-expiry after inactivity',
                            ].map(p => (
                                <li key={p}>
                                    <ShieldCheck size={14} />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="login-panel__footer">
                        © {new Date().getFullYear()} Thread Security Academy
                    </p>
                </aside>

                {/* Login Card */}
                <main className="login-card">
                    <div className="login-card__header">
                        <div className="login-card__icon">
                            <Lock size={22} />
                        </div>
                        <h1 className="login-card__title">Sign in</h1>
                        <p className="login-card__sub">
                            Don't have an account?{' '}
                            <Link to="/register" className="login-card__link">Create one</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="login-error" role="alert">
                            <AlertCircle size={15} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        <div className="login-field">
                            <label htmlFor="email">Email Address</label>
                            <div className="login-input-wrap">
                                <Mail size={16} className="login-input-icon" />
                                <input
                                    ref={emailRef}
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <div className="login-input-wrap">
                                <Lock size={16} className="login-input-icon" />
                                <input
                                    id="password"
                                    type={showPw ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="login-pw-toggle"
                                    onClick={() => setShowPw(p => !p)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 size={16} className="login-spin" /> Authenticating…</>
                            ) : (
                                'Sign In Securely'
                            )}
                        </button>
                    </form>

                    <p className="login-secure-note">
                        <Lock size={11} />
                        Session tokens are never stored in localStorage or cookies.
                    </p>
                </main>
            </div>
        </div>
    );
}
