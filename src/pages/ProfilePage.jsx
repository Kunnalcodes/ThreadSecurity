import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    User, Mail, Phone, Calendar, ShieldCheck,
    LogOut, Edit3, Github, Linkedin, BookOpen,
    CheckCircle2, Loader2, AlertCircle
} from 'lucide-react';
import './ProfilePage.css';

export default function ProfilePage() {
    const { user, isAuthenticated, logout, authFetch } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }
        fetchProfile();
    }, [isAuthenticated]);

    async function fetchProfile() {
        setLoading(true);
        try {
            const res = await authFetch('/api/auth/profile/');
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setEditForm({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone: data.phone || '',
                    bio: data.bio || '',
                    linkedin: data.linkedin || '',
                    github: data.github || '',
                    interests: data.interests || '',
                });
            } else if (res.status === 401) {
                navigate('/login', { replace: true });
            }
        } catch { /* network error */ }
        setLoading(false);
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaveStatus('saving');
        try {
            const res = await authFetch('/api/auth/profile/update/', {
                method: 'PATCH',
                body: JSON.stringify(editForm),
            });
            if (res.ok) {
                setSaveStatus('saved');
                setEditing(false);
                fetchProfile();
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 4000);
            }
        } catch {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 4000);
        }
    }

    async function handleLogout() {
        await logout();
        navigate('/', { replace: true });
    }

    const initials = profile
        ? `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.toUpperCase()
        : '?';

    if (loading) {
        return (
            <div className="pp-loading">
                <Loader2 size={28} className="pp-loader-spin" />
                <span>Loading profile…</span>
            </div>
        );
    }

    return (
        <div className="pp-page">
            {/* Background */}
            <div className="pp-bg" aria-hidden="true">
                <div className="pp-blob pp-blob--1" />
                <div className="pp-blob pp-blob--2" />
                <div className="pp-grid" />
            </div>

            <div className="pp-inner">
                {/* ── Top nav bar ── */}
                <nav className="pp-topnav">
                    <Link to="/" className="pp-topnav__logo">
                        <ShieldCheck size={20} />
                        <span>Thread Security</span>
                    </Link>
                    <div className="pp-topnav__actions">
                        <Link to="/" className="pp-topnav__home">← Back to Home</Link>
                        <button className="pp-logout-btn" onClick={handleLogout}>
                            <LogOut size={15} />
                            Sign Out
                        </button>
                    </div>
                </nav>

                <div className="pp-content">
                    {/* ── Hero card ── */}
                    <div className="pp-hero">
                        <div className="pp-avatar">
                            {profile?.avatar_url
                                ? <img src={profile.avatar_url} alt="Avatar" />
                                : <span>{initials}</span>
                            }
                        </div>
                        <div className="pp-hero__info">
                            <h1 className="pp-hero__name">
                                {profile?.first_name} {profile?.last_name}
                            </h1>
                            <p className="pp-hero__email">{profile?.email}</p>
                            {profile?.is_staff && (
                                <span className="pp-admin-badge">
                                    <ShieldCheck size={12} /> Admin
                                </span>
                            )}
                        </div>
                        {saveStatus === 'saved' && (
                            <div className="pp-save-success">
                                <CheckCircle2 size={14} /> Profile updated!
                            </div>
                        )}
                        {saveStatus === 'error' && (
                            <div className="pp-save-error">
                                <AlertCircle size={14} /> Save failed. Try again.
                            </div>
                        )}
                        <button
                            className="pp-edit-btn"
                            onClick={() => setEditing(e => !e)}
                        >
                            <Edit3 size={14} />
                            {editing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    <div className="pp-grid-layout">
                        {/* ── Info cards ── */}
                        <div className="pp-info-section">
                            {/* Edit Form */}
                            {editing ? (
                                <form className="pp-edit-form" onSubmit={handleSave}>
                                    <div className="pp-form-row">
                                        <div className="pp-form-field">
                                            <label>First Name</label>
                                            <input
                                                value={editForm.first_name}
                                                onChange={e => setEditForm(f => ({ ...f, first_name: e.target.value }))}
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="pp-form-field">
                                            <label>Last Name</label>
                                            <input
                                                value={editForm.last_name}
                                                onChange={e => setEditForm(f => ({ ...f, last_name: e.target.value }))}
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="pp-form-field">
                                        <label>Phone</label>
                                        <input
                                            value={editForm.phone}
                                            onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                    <div className="pp-form-field">
                                        <label>Bio</label>
                                        <textarea
                                            value={editForm.bio}
                                            onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))}
                                            placeholder="Tell us about yourself..."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="pp-form-row">
                                        <div className="pp-form-field">
                                            <label>LinkedIn</label>
                                            <input
                                                value={editForm.linkedin}
                                                onChange={e => setEditForm(f => ({ ...f, linkedin: e.target.value }))}
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                        <div className="pp-form-field">
                                            <label>GitHub</label>
                                            <input
                                                value={editForm.github}
                                                onChange={e => setEditForm(f => ({ ...f, github: e.target.value }))}
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </div>
                                    <button className="pp-save-btn" type="submit" disabled={saveStatus === 'saving'}>
                                        {saveStatus === 'saving'
                                            ? <><Loader2 size={14} className="pp-spin" /> Saving…</>
                                            : <><CheckCircle2 size={14} /> Save Changes</>
                                        }
                                    </button>
                                </form>
                            ) : (
                                <div className="pp-details">
                                    <InfoRow icon={<Mail size={15}/>} label="Email" value={profile?.email} />
                                    <InfoRow icon={<Phone size={15}/>} label="Phone" value={profile?.phone || '—'} />
                                    <InfoRow icon={<Calendar size={15}/>} label="Member Since" value={
                                        profile?.date_joined
                                            ? new Date(profile.date_joined).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                                            : '—'
                                    } />
                                    {profile?.bio && (
                                        <InfoRow icon={<User size={15}/>} label="Bio" value={profile.bio} />
                                    )}
                                    {profile?.linkedin && (
                                        <InfoRow icon={<Linkedin size={15}/>} label="LinkedIn" value={
                                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="pp-link">
                                                {profile.linkedin}
                                            </a>
                                        } />
                                    )}
                                    {profile?.github && (
                                        <InfoRow icon={<Github size={15}/>} label="GitHub" value={
                                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="pp-link">
                                                {profile.github}
                                            </a>
                                        } />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ── Security Info ── */}
                        <div className="pp-security-card">
                            <h3 className="pp-card-title">
                                <ShieldCheck size={16} className="pp-card-icon" />
                                Security
                            </h3>
                            <div className="pp-security-items">
                                <div className="pp-security-item">
                                    <div className="pp-security-dot green" />
                                    <span>Session active · Auto-expires</span>
                                </div>
                                <div className="pp-security-item">
                                    <div className="pp-security-dot green" />
                                    <span>Tokens: sessionStorage only</span>
                                </div>
                                <div className="pp-security-item">
                                    <div className="pp-security-dot green" />
                                    <span>Password: bcrypt hashed</span>
                                </div>
                                <div className="pp-security-item">
                                    <div className="pp-security-dot green" />
                                    <span>Data: TLS in transit</span>
                                </div>
                            </div>
                            {profile?.is_staff && (
                                <a
                                    href="/admin/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pp-admin-link"
                                >
                                    <ShieldCheck size={14} />
                                    Open Admin Panel
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="pp-info-row">
            <div className="pp-info-row__icon">{icon}</div>
            <div>
                <div className="pp-info-row__label">{label}</div>
                <div className="pp-info-row__value">{value}</div>
            </div>
        </div>
    );
}
