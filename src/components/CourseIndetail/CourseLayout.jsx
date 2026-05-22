import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, 
    Award, 
    TrendingUp, 
    CheckCircle2, 
    Terminal, 
    Briefcase, 
    BookOpen, 
    Star, 
    ChevronDown, 
    ChevronUp, 
    Wrench,
    GraduationCap,
    ArrowRight
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Enquiry from '../Enquiry/Enquiry';

function CourseLayout({ course, themeClass }) {
    const [activeTab, setActiveTab] = useState('overview'); // overview | curriculum | career
    const [expandedModule, setExpandedModule] = useState(0);

    if (!course) return null;

    // Framer motion variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const tabContentVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' }
        },
        exit: { 
            opacity: 0, 
            x: 15,
            transition: { duration: 0.2 }
        }
    };

    const handleEnrollClick = () => {
        const enquirySection = document.getElementById('enquiry');
        if (enquirySection) {
            enquirySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`course-detail-page ${themeClass}`}>
            <Navbar />
            
            {/* Background elements */}
            <div className="cd-bg-grid" />
            <div className="cd-bg-glow" />

            {/* 1. HERO SECTION */}
            <section className="cd-hero">
                <div className="cd-hero-wrapper">
                    <motion.div 
                        className="cd-hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        {/* Eyebrow badge */}
                        <div className="cd-eyebrow">
                            <span className="cd-dot" />
                            {course.category}
                            {course.trending && <span className="cd-trending-badge">Trending</span>}
                        </div>

                        {/* Title */}
                        <h1 className="cd-title">
                            {course.title}
                        </h1>

                        {/* Tagline */}
                        <p className="cd-tagline">
                            {course.tagline}
                        </p>

                        {/* Stats grid */}
                        <div className="cd-stats">
                            <div className="cd-stat-item">
                                <Star size={16} className="cd-star-icon" />
                                <span>{course.rating}</span>
                            </div>
                            <div className="cd-stat-item">
                                <Calendar size={16} />
                                <span>{course.duration}</span>
                            </div>
                            <div className="cd-stat-item">
                                <Award size={16} />
                                <span>{course.difficulty}</span>
                            </div>
                            <div className="cd-stat-item">
                                <GraduationCap size={16} />
                                <span>{course.enrolled}</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="cd-hero-actions">
                            <button className="cd-btn-primary" onClick={handleEnrollClick}>
                                Enroll In Course
                                <ArrowRight size={16} />
                            </button>
                            <button className="cd-btn-secondary" onClick={handleEnrollClick}>
                                Download Curriculum
                                <Terminal size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. TABS INTERACTIVE LAYOUT */}
            <section className="cd-tabs-section">
                <div className="cd-tabs-container">
                    
                    {/* Tab Selection Headers */}
                    <div className="cd-tab-headers" role="tablist">
                        <button
                            role="tab"
                            aria-selected={activeTab === 'overview'}
                            className={`cd-tab-header ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <BookOpen size={16} />
                            Overview & Tools
                        </button>
                        <button
                            role="tab"
                            aria-selected={activeTab === 'curriculum'}
                            className={`cd-tab-header ${activeTab === 'curriculum' ? 'active' : ''}`}
                            onClick={() => setActiveTab('curriculum')}
                        >
                            <Terminal size={16} />
                            Curriculum
                        </button>
                        <button
                            role="tab"
                            aria-selected={activeTab === 'career'}
                            className={`cd-tab-header ${activeTab === 'career' ? 'active' : ''}`}
                            onClick={() => setActiveTab('career')}
                        >
                            <TrendingUp size={16} />
                            Career Path
                        </button>
                    </div>

                    {/* Tab Panels */}
                    <div className="cd-tab-body">
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div 
                                    key="overview"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="cd-tab-panel"
                                >
                                    <div className="cd-overview-grid">
                                        <div className="cd-overview-main">
                                            <h3>Course Overview</h3>
                                            <p>{course.overview}</p>

                                            <div className="cd-prereqs">
                                                <h4>
                                                    <Terminal size={15} />
                                                    Prerequisites
                                                </h4>
                                                <p>{course.prerequisites}</p>
                                            </div>
                                        </div>

                                        <div className="cd-overview-aside">
                                            <div className="cd-outcomes-card">
                                                <h4>What You Will Learn</h4>
                                                <ul className="cd-outcomes-list">
                                                    {course.outcomes.map((outcome, idx) => (
                                                        <li key={idx}>
                                                            <CheckCircle2 size={16} className="cd-check-icon" />
                                                            <span>{outcome}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="cd-tools-card">
                                                <h4>
                                                    <Wrench size={15} />
                                                    Key Tools & Technologies
                                                </h4>
                                                <div className="cd-tools-grid">
                                                    {course.tools.map((tool, idx) => (
                                                        <span key={idx} className="cd-tool-badge">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'curriculum' && (
                                <motion.div 
                                    key="curriculum"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="cd-tab-panel"
                                >
                                    <div className="cd-curriculum-header">
                                        <h3>Detailed Curriculum</h3>
                                        <p>Comprehensive structured syllabus modules covering fundamental to advanced domains.</p>
                                    </div>

                                    <div className="cd-curriculum-list">
                                        {course.syllabus.map((module, idx) => {
                                            const isExpanded = expandedModule === idx;
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`cd-module-item ${isExpanded ? 'expanded' : ''}`}
                                                >
                                                    <button 
                                                        className="cd-module-trigger"
                                                        onClick={() => setExpandedModule(isExpanded ? null : idx)}
                                                    >
                                                        <div className="cd-module-title-group">
                                                            <span className="cd-module-number">0{idx + 1}</span>
                                                            <h4>{module.title}</h4>
                                                        </div>
                                                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="cd-module-content"
                                                            >
                                                                <ul className="cd-module-topics">
                                                                    {module.topics.map((topic, topicIdx) => (
                                                                        <li key={topicIdx}>
                                                                            <ArrowRight size={14} className="cd-arrow-icon" />
                                                                            <span>{topic}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'career' && (
                                <motion.div 
                                    key="career"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="cd-tab-panel"
                                >
                                    <div className="cd-career-layout">
                                        <div className="cd-career-info">
                                            <h3>Career Pathways</h3>
                                            <p>This industry-aligned curriculum prepares you for high-paying roles in elite multinational corporations and security firms. Master these skills and land opportunities across these major job domains.</p>

                                            <div className="cd-career-grid">
                                                {course.careerRoles.map((roleObj, idx) => (
                                                    <div key={idx} className="cd-career-card">
                                                        <div className="cd-career-badge">
                                                            <Briefcase size={16} />
                                                        </div>
                                                        <h4>{roleObj.role}</h4>
                                                        <p className="cd-career-salary">{roleObj.salary}</p>
                                                        <span className="cd-career-trend">Average Market Salary</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </section>

            {/* 3. PROMO / DUAL-ENROLL ENCOURAGEMENT CARD */}
            <section className="cd-promo-section">
                <motion.div 
                    className="cd-promo-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="cd-promo-accent" />
                    <h2>Launch Your Professional Career Today</h2>
                    <p>All Thread Security courses include intensive 1-on-1 mentor guidance, lifetime access to course content, practical hands-on security labs, and a verifiable digital certificate upon successful completion.</p>
                    <button className="cd-promo-btn" onClick={handleEnrollClick}>
                        Inquire For Admissions
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </section>

            {/* 4. ENQUIRY SECTION */}
            <Enquiry />

            <Footer />
        </div>
    );
}

export default CourseLayout;
