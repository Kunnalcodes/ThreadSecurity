import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { 
    Target, 
    Brain, 
    Globe, 
    Shield, 
    Microscope, 
    Cloud,
    Lock,
    Cpu,
    Database,
    Server,
    Activity,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle2
} from 'lucide-react';
import './CourseLineup.css';

// Icon mapping for premium look
const courseIcons = {
    1: Target,
    2: Brain,
    3: Globe,
    4: Shield,
    5: Microscope,
    6: Cloud
};

const courses = [
    {
        id: 1,
        icon: 'Target',
        tag: 'Most Popular',
        difficulty: 'Intermediate',
        title: 'Certified Ethical Hacker',
        subtitle: 'CEH Prep Track',
        description: 'Master the mindset of a hacker to better defend systems. Recon, exploitation, post-exploitation, and exam prep.',
        meta: '12 weeks',
        modules: '48 modules',
        enrolled: '2.4k enrolled',
        colorScheme: 'red'
    },
    {
        id: 2,
        icon: 'Brain',
        tag: 'New',
        difficulty: 'Advanced',
        title: 'Cyber AI & ML',
        subtitle: 'Intelligence Track',
        description: 'AI-driven intrusion detection, anomaly pipelines, and intelligent threat analysis for modern SOC teams.',
        meta: '10 weeks',
        modules: '38 modules',
        enrolled: '1.1k enrolled',
        colorScheme: 'purple'
    },
    {
        id: 3,
        icon: 'Globe',
        tag: 'Beginner Friendly',
        difficulty: 'Beginner',
        title: 'Web & App Security',
        subtitle: 'Full-Stack Secure Dev',
        description: 'Build secure web apps with modern stacks while weaving OWASP, SSRF, and auth hardening into every sprint.',
        meta: '14 weeks',
        modules: '56 modules',
        enrolled: '3.2k enrolled',
        colorScheme: 'blue'
    },
    {
        id: 4,
        icon: 'Shield',
        tag: 'In Demand',
        difficulty: 'Intermediate',
        title: 'Network Security',
        subtitle: 'Pentest & Defence',
        description: 'Protocols, firewalls, VPNs, IDS/IPS, and hands-on lab pentesting against realistic enterprise networks.',
        meta: '10 weeks',
        modules: '40 modules',
        enrolled: '1.8k enrolled',
        colorScheme: 'green'
    },
    {
        id: 5,
        icon: 'Microscope',
        tag: 'Specialization',
        difficulty: 'Advanced',
        title: 'Digital Forensics',
        subtitle: 'Incident Response',
        description: 'Evidence collection, memory forensics, disk imaging, log correlation, and chain of custody best practices.',
        meta: '8 weeks',
        modules: '32 modules',
        enrolled: '900 enrolled',
        colorScheme: 'orange'
    },
    {
        id: 6,
        icon: 'Cloud',
        tag: 'Cloud Era',
        difficulty: 'Intermediate',
        title: 'Cloud Security',
        subtitle: 'AWS · Azure · GCP',
        description: 'IAM hardening, misconfiguration hunting, container security, and compliance across major cloud providers.',
        meta: '9 weeks',
        modules: '36 modules',
        enrolled: '1.5k enrolled',
        colorScheme: 'yellow'
    },
];

const FILTER_OPTIONS = ['All', 'Popular', 'Intermediate', 'Advanced'];

const AngledCourseCard = ({ course, angle, hoverScale, isHovered, setIsHovered, onEnroll, enrolling, success, onNavigate }) => {
    const cardVariants = {
        offHover: {
            rotateY: angle,
            z: 60,
            scale: 1,
            transition: {
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50
            }
        },
        onHover: {
            rotateY: 0,
            z: 120,
            scale: hoverScale,
            transition: {
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50
            }
        }
    };

    const IconComponent = courseIcons[course.id];

    return (
        <motion.article
            className={`course-angled-card course-${course.colorScheme} ${enrolling ? 'enrolling' : ''} ${success ? 'success' : ''}`}
            variants={cardVariants}
            initial="offHover"
            animate={isHovered === course.id ? "onHover" : "offHover"}
            onMouseEnter={() => setIsHovered(course.id)}
            onMouseLeave={() => setIsHovered(null)}
        >
            {/* Card Navigation Arrows */}
            <div className="card-nav-arrows">
                <button 
                    className="card-nav-arrow card-nav-left"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('prev');
                    }}
                    aria-label="Previous course"
                >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button 
                    className="card-nav-arrow card-nav-right"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('next');
                    }}
                    aria-label="Next course"
                >
                    <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Glare Effect */}
            <div className="card-glare"></div>

            {/* Loading Bar */}
            <div className="course-load-bar" aria-hidden="true" />

            {/* Success Overlay */}
            <div className="course-success-overlay">
                <div className="course-check-wrapper">
                    <Lock className="course-check-icon" size={48} strokeWidth={2.5} />
                </div>
                <p className="course-enrolled-text">You're on the list!</p>
            </div>

            {/* Card Header */}
            <div className="course-card-header">
                <div className={`course-icon course-icon-${course.colorScheme}`}>
                    <IconComponent size={32} strokeWidth={2} />
                </div>
                <span className={`course-badge course-badge-${course.colorScheme}`}>{course.tag}</span>
            </div>

            {/* Content */}
            <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-subtitle">{course.subtitle}</p>
                
                <div className="course-meta">
                    <span>{course.meta}</span>
                    <span>•</span>
                    <span>{course.modules}</span>
                </div>

                <p className="course-description">{course.description}</p>
            </div>

            {/* Footer */}
            <div className="course-footer">
                <span className="course-enrolled">{course.enrolled}</span>
                <button
                    type="button"
                    className={`course-enroll-btn course-enroll-${course.colorScheme}`}
                    disabled={!!enrolling || success}
                    onClick={() => onEnroll(course.id)}
                >
                    {success ? (
                        <>
                            <Lock size={16} strokeWidth={2.5} />
                            Enrolled
                        </>
                    ) : enrolling ? (
                        <>
                            <Activity size={16} strokeWidth={2.5} className="enrolling-spinner" />
                            Enrolling...
                        </>
                    ) : (
                        <>
                            Enroll Now
                            <Server size={16} strokeWidth={2.5} />
                        </>
                    )}
                </button>
            </div>
        </motion.article>
    );
};

function CourseLineup() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [enrollingId, setEnrollingId] = useState(null);
    const [successId, setSuccessId] = useState(null);
    const [enrolledCourse, setEnrolledCourse] = useState(null);
    const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);

    const x = useMotionValue(0);
    const [isPaused, setIsPaused] = useState(false);

    const angle = 20;
    const hoverScale = 1.05;
    const speed = 45;
    const direction = 'left';
    const cardWidth = 380;
    const gap = 32;

    const filtered = useMemo(() => {
        if (activeFilter === 'All') return courses;
        if (activeFilter === 'Popular') {
            return courses.filter((c) => c.tag === 'Most Popular' || c.tag === 'New' || c.tag === 'In Demand');
        }
        return courses.filter((c) => c.difficulty === activeFilter);
    }, [activeFilter]);

    // Duplicate items for infinite loop
    const duplicatedCourses = [...filtered, ...filtered, ...filtered];

    useEffect(() => {
        const calculateWidth = () => {
            const calculatedWidth = (cardWidth + gap) * filtered.length;
            setWidth(calculatedWidth);
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [filtered]);

    useEffect(() => {
        if (width <= 0) return;

        const startX = direction === 'left' ? 0 : -width;
        const endX = direction === 'left' ? -width : 0;

        if (isPaused || hoveredCard) return;

        const runAnimation = () => {
            const currentX = x.get();
            const totalDist = width;
            const dist = Math.abs(endX - currentX);
            const duration = speed * (dist / totalDist);

            const controls = animate(x, endX, {
                duration: duration,
                ease: 'linear',
                onComplete: () => {
                    x.set(startX);
                    runAnimation();
                }
            });
            return controls;
        };

        const animation = runAnimation();

        return () => {
            animation.stop();
        };
    }, [width, speed, direction, isPaused, x, hoveredCard]);

    const handleEnroll = (id) => {
        if (successId === id || enrollingId) return;
        setEnrollingId(id);
        const course = courses.find(c => c.id === id);
        
        setTimeout(() => {
            setEnrollingId(null);
            setSuccessId(id);
            setEnrolledCourse(course);
            setShowEnrollmentDialog(true);
            
            // Auto-dismiss success state
            setTimeout(() => {
                setSuccessId(null);
            }, 3000);

            // Auto-dismiss dialog
            setTimeout(() => {
                setShowEnrollmentDialog(false);
            }, 5000);
        }, 950);
    };

    const handleNavigate = (direction) => {
        const currentOffset = x.get();
        const step = cardWidth + gap;
        const newOffset = direction === 'next' ? currentOffset - step : currentOffset + step;
        
        animate(x, newOffset, {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        });
    };

    const handleSliderNavigate = (direction) => {
        const step = (cardWidth + gap) * 3;
        const currentOffset = x.get();
        const newOffset = direction === 'next' ? currentOffset - step : currentOffset + step;
        
        animate(x, newOffset, {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
        });
    };

    return (
        <section className="course-lineup-section" id="courses">
            {/* Background Gradient Orbs */}
            <div className="course-orb course-orb-1"></div>
            <div className="course-orb course-orb-2"></div>
            <div className="course-orb course-orb-3"></div>

            {/* Enrollment Dialog */}
            <AnimatePresence>
                {showEnrollmentDialog && enrolledCourse && (
                    <motion.div
                        className="enrollment-dialog-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`enrollment-dialog enrollment-dialog-${enrolledCourse.colorScheme}`}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button 
                                className="enrollment-dialog-close"
                                onClick={() => setShowEnrollmentDialog(false)}
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                            
                            <div className="enrollment-dialog-icon">
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                            </div>
                            
                            <h3 className="enrollment-dialog-title">Successfully Enrolled!</h3>
                            <p className="enrollment-dialog-course">{enrolledCourse.title}</p>
                            <p className="enrollment-dialog-subtitle">{enrolledCourse.subtitle}</p>
                            
                            <div className="enrollment-dialog-details">
                                <span>{enrolledCourse.meta}</span>
                                <span>•</span>
                                <span>{enrolledCourse.modules}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="course-lineup-container">
                {/* Header */}
                <header className="course-lineup-header">
                    <div className="course-header-content">
                        <span className="course-section-badge">
                            <Database size={14} strokeWidth={2.5} />
                            Course Catalog
                        </span>
                        <h2 className="course-section-title">
                            Structured <span className="highlight-lime">Learning Paths</span>
                        </h2>
                        <p className="course-section-subtitle">
                            From fundamentals to advanced offensive and defensive security — master every domain
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="course-filters" role="tablist" aria-label="Filter courses">
                        {FILTER_OPTIONS.map((label) => (
                            <button
                                key={label}
                                type="button"
                                role="tab"
                                aria-selected={activeFilter === label}
                                className={`course-filter-tab ${activeFilter === label ? 'active' : ''}`}
                                onClick={() => setActiveFilter(label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Slider Navigation Controls */}
                <div className="slider-controls">
                    <button 
                        className="slider-nav-btn slider-nav-prev"
                        onClick={() => handleSliderNavigate('prev')}
                        aria-label="Previous courses"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <button 
                        className="slider-nav-btn slider-nav-next"
                        onClick={() => handleSliderNavigate('next')}
                        aria-label="Next courses"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Angled Slider */}
                <div 
                    className="course-angled-slider"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {filtered.length === 0 ? (
                        <p className="course-empty-state">No courses match this filter</p>
                    ) : (
                        <motion.div
                            ref={containerRef}
                            className="course-slider-track"
                            style={{ x, gap: `${gap}px`, transformStyle: 'preserve-3d' }}
                        >
                            {duplicatedCourses.map((course, index) => (
                                <AngledCourseCard
                                    key={`${course.id}-${index}`}
                                    course={course}
                                    angle={angle}
                                    hoverScale={hoverScale}
                                    isHovered={hoveredCard}
                                    setIsHovered={setHoveredCard}
                                    onEnroll={handleEnroll}
                                    enrolling={enrollingId === course.id}
                                    success={successId === course.id}
                                    onNavigate={handleNavigate}
                                />
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Course Count */}
                <div className="course-count-badge">
                    <Cpu size={16} strokeWidth={2.5} />
                    <span>{filtered.length}</span> {filtered.length === 1 ? 'Course' : 'Courses'} Available
                </div>
            </div>
        </section>
    );
}

export default CourseLineup;
