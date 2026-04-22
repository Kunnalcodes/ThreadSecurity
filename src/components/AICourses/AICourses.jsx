import { useState, useRef, useEffect } from 'react';
import {
    Brain, Sparkles, Code2, Database, Eye, MessageSquare,
    Bot, ChevronRight, ChevronDown, ExternalLink, Zap,
    Play, BarChart2, Cloud, Cpu, Search, Globe, Star
} from 'lucide-react';
import './AICourses.css';

/* ─── DATA ────────────────────────────────────────────────────── */

const AI_PROGRAMS = [
    {
        id: 'ml-ds',
        badge: 'Most Popular',
        badgeColor: 'lime',
        Icon: Brain,
        title: 'Machine Learning & Data Science',
        sub: 'Foundation to Advanced',
        duration: '5 Months',
        modules: '60 Modules',
        enrolled: '3.8k enrolled',
        color: '#5dd62c',
        highlights: ['Python & Statistics', 'Supervised & Unsupervised ML', 'Deep Learning & Neural Networks', 'Feature Engineering & EDA', 'Model Deployment (Flask / FastAPI)', 'Kaggle Competitions'],
    },
    {
        id: 'gen-ai',
        badge: 'Trending',
        badgeColor: 'pink',
        Icon: Sparkles,
        title: 'Generative AI & Prompt Engineering',
        sub: 'LLMs · RAG · Fine-Tuning',
        duration: '3 Months',
        modules: '36 Modules',
        enrolled: '2.1k enrolled',
        color: '#f4bbff',
        highlights: ['GPT-4 & Claude APIs', 'LangChain & LlamaIndex', 'RAG Pipelines', 'Prompt Engineering Mastery', 'Vector Databases (Pinecone, Weaviate)', 'AI Agent Development'],
    },
    {
        id: 'nlp',
        badge: 'In Demand',
        badgeColor: 'teal',
        Icon: MessageSquare,
        title: 'NLP & Conversational AI',
        sub: 'Chatbots · Intent · Transformers',
        duration: '4 Months',
        modules: '44 Modules',
        enrolled: '1.5k enrolled',
        color: '#22d3ee',
        highlights: ['BERT, GPT, T5 Transformers', 'Named Entity Recognition', 'Sentiment Analysis at Scale', 'Chatbot Design & Deployment', 'Speech-to-Text & TTS', 'Intent Classification'],
    },
    {
        id: 'cv',
        badge: 'Specialization',
        badgeColor: 'yellow',
        Icon: Eye,
        title: 'Computer Vision & Image AI',
        sub: 'CNN · Detection · Segmentation',
        duration: '4 Months',
        modules: '40 Modules',
        enrolled: '1.2k enrolled',
        color: '#facc15',
        highlights: ['CNNs & Transfer Learning', 'YOLO, Detectron2', 'Image Segmentation (U-Net)', 'OpenCV & MediaPipe', 'Face Recognition Systems', 'Video Analytics'],
    },
    {
        id: 'mlops',
        badge: 'Advanced',
        badgeColor: 'orange',
        Icon: Cloud,
        title: 'MLOps & AI Deployment',
        sub: 'CI/CD · Cloud · Monitoring',
        duration: '2 Months',
        modules: '24 Modules',
        enrolled: '870 enrolled',
        color: '#fb923c',
        highlights: ['Docker & Kubernetes for ML', 'MLflow & DVC', 'CI/CD for AI Pipelines', 'AWS SageMaker / Azure ML', 'Model Monitoring & Drift', 'A/B Testing for Models'],
    },
    {
        id: 'ai-security',
        badge: 'Unique',
        badgeColor: 'red',
        Icon: Cpu,
        title: 'AI for Cybersecurity',
        sub: 'Threat Detection · Anomaly AI',
        duration: '3 Months',
        modules: '32 Modules',
        enrolled: '960 enrolled',
        color: '#f87171',
        highlights: ['AI-Driven Intrusion Detection', 'Anomaly Detection Pipelines', 'Malware Classification with ML', 'Behavioral Analysis Models', 'SOC Automation with AI', 'Adversarial ML Threats'],
    },
];

const LIVE_PROJECTS = [
    {
        company: 'Google',
        logo: 'G',
        logoColor: '#4285f4',
        project: 'Smart Search & Recommendation Systems',
        longDesc: 'Learn how to build intelligent search engines and recommendation systems using advanced AI techniques, helping deliver personalized and relevant user experiences at scale.',
        tags: ['Transformers', 'Collaborative Filtering', 'Elasticsearch', 'TF-IDF'],
        accent: '#4285f4',
    },
    {
        company: 'Amazon',
        logo: 'A',
        logoColor: '#ff9900',
        project: 'E-Commerce Personalization Engine',
        longDesc: 'Develop machine learning models to predict user behavior, recommend products, and optimize customer journeys for higher engagement and conversions.',
        tags: ['XGBoost', 'A/B Testing', 'Real-time ML', 'User Embeddings'],
        accent: '#ff9900',
    },
    {
        company: 'Meta',
        logo: 'M',
        logoColor: '#0081fb',
        project: 'Conversational AI & Chatbot',
        longDesc: 'Design and develop intelligent chatbots using NLP and Large Language Models to create human-like conversational experiences across platforms.',
        tags: ['LLaMA', 'LangChain', 'Dialog Management', 'RAG'],
        accent: '#0081fb',
    },
    {
        company: 'Tesla',
        logo: 'T',
        logoColor: '#e82127',
        project: 'Autonomous Vision & Object Detection',
        longDesc: 'Build computer vision models for real-time object detection and scene understanding inspired by Tesla\'s Autopilot perception stack.',
        tags: ['YOLO', 'CNN', 'Sensor Fusion', 'OpenCV'],
        accent: '#e82127',
    },
    {
        company: 'OpenAI',
        logo: 'O',
        logoColor: '#10a37f',
        project: 'GPT-Powered Content & Code Generator',
        longDesc: 'Fine-tune and deploy GPT models to create domain-specific content generators and AI coding assistants using prompt engineering and RLHF techniques.',
        tags: ['GPT-4', 'Fine-tuning', 'RLHF', 'Prompt Engineering'],
        accent: '#10a37f',
    },
    {
        company: 'Spotify',
        logo: 'S',
        logoColor: '#1db954',
        project: 'Music Recommendation & Mood Analysis',
        longDesc: 'Build an AI-powered music recommendation engine using collaborative filtering, audio feature extraction, and mood classification models.',
        tags: ['Audio ML', 'Matrix Factorization', 'Librosa', 'Clustering'],
        accent: '#1db954',
    },
    {
        company: 'Airbnb',
        logo: 'Air',
        logoColor: '#ff5a5f',
        project: 'Dynamic Pricing & Demand Forecasting',
        longDesc: 'Develop ML models for dynamic price optimization and demand forecasting using time-series analysis, geospatial data, and ensemble methods.',
        tags: ['Time Series', 'Geospatial ML', 'XGBoost', 'Feature Store'],
        accent: '#ff5a5f',
    },
];

const TABLE_FACTORS = [
    { Icon: Star, title: 'Industry-Aligned Curriculum', desc: 'Every module is co-designed with working AI engineers and data scientists from top product companies.' },
    { Icon: Zap, title: 'Live Projects During Classes', desc: 'No toy datasets — you work on real business use cases inspired by Google, Amazon, Tesla, Meta, OpenAI, Spotify, and Airbnb during each phase.' },
    { Icon: Code2, title: 'Production-Ready Code', desc: 'Learn to write clean, deployable AI code with CI/CD pipelines, Docker containers, and cloud deployment from day one.' },
    { Icon: BarChart2, title: 'Career Placement Network', desc: 'Access to our placement network of 50+ companies, resume reviews, mock interviews, and direct referrals upon completion.' },
    { Icon: Globe, title: 'Globally Recognised Certifications', desc: 'Prepare for Azure AI, Google Cloud ML, and IBM AI Engineering certifications alongside Thread Security credentials.' },
    { Icon: Bot, title: 'AI Mentor Support', desc: 'Dedicated AI mentors available via LMS for code reviews, project guidance, and career path advice throughout the program.' },
];

/* ─── SUB-COMPONENTS ──────────────────────────────────────────── */

function AIProgramCard({ program, index }) {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const { Icon, badge, badgeColor, title, sub, duration, modules, enrolled, color, highlights } = program;

    return (
        <div
            ref={ref}
            className={`aic-program-card aic-card--${badgeColor} ${visible ? 'aic-card--in' : ''}`}
            style={{ '--card-color': color, '--delay': `${index * 0.07}s` }}
        >
            <div className="aic-card-glow" />

            <div className="aic-card-top">
                <div className="aic-card-icon-wrap">
                    <Icon size={26} strokeWidth={1.8} style={{ color }} />
                </div>
                <span className={`aic-badge aic-badge--${badgeColor}`}>{badge}</span>
            </div>

            <h3 className="aic-card-title">{title}</h3>
            <p className="aic-card-sub">{sub}</p>

            <div className="aic-card-meta">
                <span>{duration}</span>
                <span aria-hidden="true">·</span>
                <span>{modules}</span>
            </div>

            <button
                className="aic-toggle-btn"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                {open ? 'Hide modules' : 'What you learn'}
                <ChevronDown size={14} className={`aic-toggle-chevron ${open ? 'open' : ''}`} />
            </button>

            <div className={`aic-highlights ${open ? 'aic-highlights--open' : ''}`}>
                <ul>
                    {highlights.map((h, i) => (
                        <li key={i}>
                            <ChevronRight size={12} style={{ color, flexShrink: 0, marginTop: 2 }} />
                            {h}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="aic-card-footer">
                <span className="aic-enrolled">{enrolled}</span>
                <button
                    className="aic-enroll-btn"
                    onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Enroll <ExternalLink size={13} />
                </button>
            </div>
        </div>
    );
}

function LiveProjectCard({ proj, index, isActive, onClick }) {
    return (
        <div
            className={`aic-proj-card ${isActive ? 'aic-proj-card--active' : ''}`}
            style={{ '--proj-accent': proj.accent, '--delay': `${index * 0.06}s` }}
            onClick={onClick}
        >
            <div className="aic-proj-header">
                <div className="aic-company-logo" style={{ background: `${proj.accent}18`, border: `1px solid ${proj.accent}40`, color: proj.accent }}>
                    {proj.logo}
                </div>
                <div>
                    <div className="aic-company-name" style={{ color: proj.accent }}>{proj.company}</div>
                    <div className="aic-proj-title">{proj.project}</div>
                </div>
                <ChevronDown
                    size={16}
                    className={`aic-proj-chevron ${isActive ? 'open' : ''}`}
                    style={{ color: proj.accent, marginLeft: 'auto', flexShrink: 0 }}
                />
            </div>
            {isActive && (
                <div className="aic-proj-body">
                    <p className="aic-proj-desc">{proj.longDesc}</p>
                    <div className="aic-proj-tags">
                        {proj.tags.map(t => (
                            <span key={t} className="aic-proj-tag" style={{ borderColor: `${proj.accent}35`, color: proj.accent }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function FactorCard({ factor, index }) {
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
    const { Icon, title, desc } = factor;
    return (
        <div
            ref={ref}
            className={`aic-factor-card ${visible ? 'aic-factor--in' : ''}`}
            style={{ '--delay': `${index * 0.08}s` }}
        >
            <div className="aic-factor-icon">
                <Icon size={20} strokeWidth={2} />
            </div>
            <h4 className="aic-factor-title">{title}</h4>
            <p className="aic-factor-desc">{desc}</p>
        </div>
    );
}

/* ─── MAIN COMPONENT ──────────────────────────────────────────── */

export default function AICourses() {
    const [activeProj, setActiveProj] = useState(0);

    return (
        <section id="ai-courses" className="aic-section">
            {/* Background */}
            <div className="aic-bg-mesh" aria-hidden="true" />
            <div className="aic-orb aic-orb-1" aria-hidden="true" />
            <div className="aic-orb aic-orb-2" aria-hidden="true" />

            <div className="aic-inner">

                {/* ── Section header ── */}
                <div className="aic-header">
                    <div className="aic-label">
                        <Brain size={13} />
                        AI & Machine Learning Programs
                    </div>
                    <h2 className="aic-title">
                        Master the Future with <span className="aic-grad">Artificial Intelligence</span>
                    </h2>
                    <p className="aic-sub">
                        Thread Security's AI & ML programs are built for the next generation of engineers — blending
                        deep technical foundations with real-world production deployment skills.
                        Learn what it actually takes to ship AI products that matter.
                    </p>
                </div>

                {/* ── AI Program Cards ── */}
                <div className="aic-programs-grid">
                    {AI_PROGRAMS.map((prog, i) => (
                        <AIProgramCard key={prog.id} program={prog} index={i} />
                    ))}
                </div>

                {/* ── What it brings to the table ── */}
                <div className="aic-table-section">
                    <div className="aic-table-header">
                        <Star size={16} className="aic-table-icon" />
                        <h3 className="aic-table-title">What It Brings to the Table</h3>
                    </div>
                    <div className="aic-factors-grid">
                        {TABLE_FACTORS.map((f, i) => (
                            <FactorCard key={i} factor={f} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Live Projects ── */}
                <div className="aic-projects-section">
                    <div className="aic-proj-header-row">
                        <div className="aic-label aic-label--yellow">
                            <Play size={13} />
                            Live Projects During Classes
                        </div>
                    </div>
                    <h3 className="aic-proj-main-title">
                        Real Business Use Cases from{' '}
                        <span className="aic-proj-grad">World-Class Companies</span>
                    </h3>
                    <p className="aic-proj-sub">
                        Learners work on live business use cases inspired by top global companies and AI-driven
                        organizations. Not toy examples — actual production-grade problems.
                    </p>

                    {/* Company ticker */}
                    <div className="aic-company-ticker">
                        {LIVE_PROJECTS.map((p, i) => (
                            <button
                                key={i}
                                className={`aic-ticker-chip ${activeProj === i ? 'aic-ticker-chip--active' : ''}`}
                                style={{ '--chip-accent': p.accent }}
                                onClick={() => setActiveProj(i)}
                            >
                                <span className="aic-ticker-logo" style={{ color: p.accent }}>{p.logo}</span>
                                {p.company}
                            </button>
                        ))}
                    </div>

                    {/* Projects accordion */}
                    <div className="aic-projects-list">
                        {LIVE_PROJECTS.map((proj, i) => (
                            <LiveProjectCard
                                key={i}
                                proj={proj}
                                index={i}
                                isActive={activeProj === i}
                                onClick={() => setActiveProj(activeProj === i ? -1 : i)}
                            />
                        ))}
                    </div>
                </div>

                {/* ── CTA Banner ── */}
                <div className="aic-cta">
                    <div className="aic-cta-glow" aria-hidden="true" />
                    <div className="aic-cta-content">
                        <Sparkles size={24} className="aic-cta-sparkle" />
                        <div>
                            <h3 className="aic-cta-title">Ready to Build AI That Ships?</h3>
                            <p className="aic-cta-sub">Join Thread Security's AI programs and land your first AI/ML role in 6 months or less.</p>
                        </div>
                        <button
                            className="aic-cta-btn"
                            onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Enroll in AI Program <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
