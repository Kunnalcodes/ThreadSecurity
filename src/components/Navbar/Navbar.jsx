import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import brandLogo from '../../assets/Thread_Security_Logo-1--01 (1).png';
import './Navbar.css';

/* ── Dropdown data ── */
const coursesDropdown = [
    {
        category: 'Cyber Security',
        items: [
            { label: 'Ethical Hacking', trending: true },
            { label: 'Penetration Testing' },
            { label: 'Red Teaming' },
            { label: 'Network Security' },
            { label: 'Cloud Security' },
        ],
    },
    {
        category: 'Programming',
        items: [
            { label: 'Python for Security', trending: true },
            { label: 'C / C++' },
            { label: 'Web Development' },
            { label: 'MERN Stack' },
            { label: 'Kotlin' },
        ],
    },
    {
        category: 'AI & Data',
        items: [
            { label: 'Machine Learning' },
            { label: 'Data Science', trending: true },
            { label: 'Deep Learning' },
            { label: 'AI Course' },
        ],
    },

];

const programsDropdown = [
    {
        category: 'Internship',
        items: [
            { label: 'Summer Internship', trending: true },
            { label: 'Industry Internship' },
        ],
    },
    {
        category: 'Training',
        items: [
            { label: 'Corporate Training' },
            { label: 'College Workshop' },
            { label: 'Bootcamp', trending: true },
        ],
    },
];

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const dropdownTimeoutRef = useRef(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleDropdownEnter = (key) => {
        clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(key);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    const closeMobile = () => {
        setIsMobileMenuOpen(false);
        setMobileExpanded(null);
    };

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo-group" style={{ textDecoration: 'none' }}>
                    <img src={brandLogo} alt="Thread Security Platform" className="nav-brand-img" />
                    <span className="nav-logo-text">Thread Security</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="nav-links-desktop">
                    <Link to="/" className="nav-link">Home</Link>

                    {/* Courses Dropdown */}
                    <div
                        className="nav-dropdown-trigger"
                        onMouseEnter={() => handleDropdownEnter('courses')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <Link to="/course" className={`nav-link nav-link--has-arrow ${activeDropdown === 'courses' ? 'active' : ''}`}>
                            Courses <ChevronDown size={14} className={`nav-chevron ${activeDropdown === 'courses' ? 'rotated' : ''}`} />
                        </Link>

                        <div className={`nav-mega ${activeDropdown === 'courses' ? 'open' : ''}`}>
                            <div className="nav-mega__inner">
                                {coursesDropdown.map((col) => (
                                    <div key={col.category} className="nav-mega__col">
                                        <h4 className="nav-mega__heading">{col.category}</h4>
                                        <ul className="nav-mega__list">
                                            {col.items.map((item) => (
                                                <li key={item.label} className="nav-mega__item">
                                                    <a href="#" className="nav-mega__link">
                                                        {item.label}
                                                        {item.trending && <span className="nav-mega__badge">Trending</span>}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Programs Dropdown */}
                    <div
                        className="nav-dropdown-trigger"
                        onMouseEnter={() => handleDropdownEnter('programs')}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <span className={`nav-link nav-link--has-arrow ${activeDropdown === 'programs' ? 'active' : ''}`}>
                            Programs <ChevronDown size={14} className={`nav-chevron ${activeDropdown === 'programs' ? 'rotated' : ''}`} />
                        </span>

                        <div className={`nav-mega nav-mega--sm ${activeDropdown === 'programs' ? 'open' : ''}`}>
                            <div className="nav-mega__inner">
                                {programsDropdown.map((col) => (
                                    <div key={col.category} className="nav-mega__col">
                                        <h4 className="nav-mega__heading">{col.category}</h4>
                                        <ul className="nav-mega__list">
                                            {col.items.map((item) => (
                                                <li key={item.label} className="nav-mega__item">
                                                    <a href="#" className="nav-mega__link">
                                                        {item.label}
                                                        {item.trending && <span className="nav-mega__badge">Trending</span>}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a href="#experts" className="nav-link">Mentorship</a>
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <a href="#academy" className="nav-btn-primary glare-hover">Get Started</a>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X size={26} color="var(--text-primary)" /> : <Menu size={26} color="var(--text-primary)" />}
                </button>
            </div>

            {/* Mobile Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-links">
                    <Link to="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>

                    {/* Mobile Courses Accordion */}
                    <div className="mobile-accordion">
                        <button
                            className="mobile-nav-link mobile-accordion__trigger"
                            onClick={() => setMobileExpanded(mobileExpanded === 'courses' ? null : 'courses')}
                        >
                            Courses <ChevronDown size={18} className={`nav-chevron ${mobileExpanded === 'courses' ? 'rotated' : ''}`} />
                        </button>
                        <div className={`mobile-accordion__panel ${mobileExpanded === 'courses' ? 'expanded' : ''}`}>
                            {coursesDropdown.map((col) => (
                                <div key={col.category} className="mobile-accordion__group">
                                    <h5 className="mobile-accordion__heading">{col.category}</h5>
                                    {col.items.map((item) => (
                                        <a key={item.label} href="#" className="mobile-accordion__link" onClick={closeMobile}>
                                            {item.label}
                                            {item.trending && <span className="nav-mega__badge">Trending</span>}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Programs Accordion */}
                    <div className="mobile-accordion">
                        <button
                            className="mobile-nav-link mobile-accordion__trigger"
                            onClick={() => setMobileExpanded(mobileExpanded === 'programs' ? null : 'programs')}
                        >
                            Programs <ChevronDown size={18} className={`nav-chevron ${mobileExpanded === 'programs' ? 'rotated' : ''}`} />
                        </button>
                        <div className={`mobile-accordion__panel ${mobileExpanded === 'programs' ? 'expanded' : ''}`}>
                            {programsDropdown.map((col) => (
                                <div key={col.category} className="mobile-accordion__group">
                                    <h5 className="mobile-accordion__heading">{col.category}</h5>
                                    {col.items.map((item) => (
                                        <a key={item.label} href="#" className="mobile-accordion__link" onClick={closeMobile}>
                                            {item.label}
                                            {item.trending && <span className="nav-mega__badge">Trending</span>}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <a href="#experts" className="mobile-nav-link" onClick={closeMobile}>Mentorship</a>
                    <a href="#academy" className="mobile-nav-btn glare-hover" onClick={closeMobile}>Get Started</a>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
