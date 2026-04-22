import brandLogo from '../../assets/Thread_Security_Logo-1--01 (1).png';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    {/* Brand */}
                    <div className="footer-brand">
                        <a href="#" className="footer-logo">
                            <img src={brandLogo} alt="Cyberyaan Academy" className="footer-brand-img" />
                        </a>
                        <p className="footer-tagline">
                            Premium cybersecurity education platform. Career-focused tracks built for
                            hands-on learning and real-world skills.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="footer-social">
                            <a href="https://x.com/ThreadSecurity" className="social-icon" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/thread_security?igsh=MXIxZ2p3dWUwZDN6eQ==" className="social-icon" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M12 2.163c3.204 0 5.805 2.601 5.805 5.805s-2.601 5.805-5.805 5.805S6.195 11.173 6.195 7.968s2.601-5.805 5.805-5.805zm0 10.144c-2.421 0-4.384-1.963-4.384-4.384s1.963-4.384 4.384-4.384 4.384 1.963 4.384 4.384-1.963 4.384-4.384 4.384zm0-7.595c1.778 0 3.221 1.443 3.221 3.221s-1.443 3.221-3.221 3.221-3.221-1.443-3.221-3.221 1.443-3.221 3.221-3.221zm7.456-3.774h-1.959v-1.96h1.959zm-3.519 0h-1.96v-1.959h1.96z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/thread-security/" className="social-icon" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="https://github.com/threadsecurity/" className="social-icon" aria-label="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                            </a>
                            <a href="#" className="social-icon" aria-label="Discord">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Courses */}
                    <div className="footer-col">
                        <h4>Courses</h4>
                        <ul>
                            <li><a href="#">Specializations</a></li>
                            <li><a href="#">Cyber AI Track</a></li>
                            <li><a href="#">Web Dev Track</a></li>
                            <li><a href="#">CEH Prep</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Lab Environments</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Partners</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <div className="newsletter-content">
                        <div className="newsletter-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div>
                            <h4>Stay Updated</h4>
                            <p>Get the latest cybersecurity insights and course updates</p>
                        </div>
                    </div>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email" className="newsletter-input" />
                        <button type="submit" className="newsletter-btn">
                            <span>Subscribe</span>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Cyberyaan Academy. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
