import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import threadVideo from '../../assets/Thread_Logo.mp4';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';



/* ── Particle Field ── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    function initParticles() {
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.5 + 0.15,
      }));
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,65,${0.07 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,65,${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ── Scanline ticker ── */
const TICKER_ITEMS = [
  'FIREWALL STATUS: ACTIVE',
  'ZERO-DAY VULNERABILITIES PATCHED: 1,204',
  'THREAT INTEL FEEDS: 38 ACTIVE',
  'ENROLLED OPERATIVES: 94,000+',
  'UPTIME: 99.98%',
  'PROTOCOLS SECURED: TLS 1.3 · AES-256 · BLAKE3',
];

function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-sep">▸</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Terminal Welcome Message ── */
function TerminalWelcome() {
  const [text, setText] = useState('');
  const fullText = '> welcome to threadsecurity academy_';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-terminal">
      <span className="term-text">{text}</span>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState('idle'); // idle | loading | done
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Cybersecurity Foundation'
  });

  const handleStartTraining = () => {
    navigate('/course');
  };

  const handleCurriculumClick = () => {
    const section = document.getElementById('career');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrollClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate linking to an excel/google sheet via an API call
    // In a real scenario, this would be a Google Apps Script URL or a backend endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted to Excel/Sheets:', formData);
      setFormStatus('success');
      setTimeout(() => {
        setShowModal(false);
        setFormStatus('idle');
        setFormData({ name: '', email: '', phone: '', course: 'Cybersecurity Foundation' });
      }, 2500);
    } catch (err) {
      setFormStatus('idle');
    }
  };

  // Enroll progress
  useEffect(() => {
    if (btnState !== 'loading') return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(iv);
          setBtnState('done');
          setTimeout(() => { setBtnState('idle'); setProgress(0); }, 2800);
          return 100;
        }
        return p + 2;
      });
    }, 38);
    return () => clearInterval(iv);
  }, [btnState]);

  return (
    <section className="hs">
      {/* Particle mesh */}
      <ParticleField />

      {/* Ambient gradient blobs */}
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />

      {/* Decorative grid */}
      <div className="grid-overlay" />

      {/* Top nav bar hint */}
      <div className="nav-bar">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">CYPHER<span className="logo-accent">SEC</span></span>
          <span className="logo-bracket">]</span>
        </div>
        <div className="nav-status">
          <span className="status-dot" />
          <span className="status-text">ALL SYSTEMS OPERATIONAL</span>
        </div>
        <div className="nav-id">ID:&nbsp;<span className="nav-id-val">OPSEC_7F2A</span></div>
      </div>



      <div className="hs-inner">
        {/* ── LEFT: TEXT ── */}
        <motion.div
          className="hs-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="hs-left-content">
            <div className="badge">
              <span className="badge-ping" />
              <span className="badge-text">ISO 27001 Certified</span>
            </div>

            <TerminalWelcome />

            <h1 className="hs-title">
              <span className="title-dim">Secure the</span>
              <span className="title-main">Digital Frontier</span>
              <span className="title-sub">Before it secures you.</span>
            </h1>

            <p className="hs-desc">
              Elite training for the next generation of operatives. 
              Forged in real-world simulations.
            </p>

            <div className="cta-row">
              <button className="btn-primary" onClick={handleStartTraining}>
                <span>Start Training</span>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </button>

              <button
                className={`btn-enroll ${btnState}`}
                onClick={handleEnrollClick}
              >
                <span className="enroll-icon">⬡</span> Enroll Free
              </button>

              <button className="btn-ghost" onClick={handleCurriculumClick}>
                View Curriculum ↗
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: VIDEO ── */}
        <motion.div
          className="hs-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="premium-video-container">
            <video
              src={threadVideo}
              autoPlay
              loop
              muted
              playsInline
              className="hero-video"
            />


            {/* Ambient glows and marks can stay inside the video container */}
            <div className="video-glow" />
            <div className="tech-mark tm-tl" />
            <div className="tech-mark tm-tr" />
            <div className="tech-mark tm-bl" />
            <div className="tech-mark tm-br" />
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <Ticker />

      {/* Corner brackets */}
      <span className="cb cb-tl" /><span className="cb cb-tr" />
      <span className="cb cb-bl" /><span className="cb cb-br" />

      {/* ── ENQUIRY MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="enq-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="enq-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="enq-close-btn" onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="enq-modal-header">
                <div className="enq-modal-badge">ADMISSIONS OPEN</div>
                <h2 className="enq-modal-title">Secure Your <span>Spot</span></h2>
                <p className="enq-modal-desc">Fill out the form below to initiate your enrollment process.</p>
              </div>

              <form className="enq-modal-form" onSubmit={handleFormSubmit}>
                <div className="enq-input-group">
                  <label>FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="enq-input-row">
                  <div className="enq-input-group">
                    <label>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="enq-input-group">
                    <label>PHONE NUMBER</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="enq-input-group">
                  <label>COURSE INTEREST</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  >
                    <option>Cybersecurity Foundation</option>
                    <option>Advanced Ethical Hacking</option>
                    <option>Cloud Security Specialist</option>
                    <option>Zero Trust Architecture</option>
                  </select>
                </div>

                <button
                  className={`enq-modal-submit ${formStatus}`}
                  type="submit"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'idle' && 'SUBMIT ENQUIRY'}
                  {formStatus === 'sending' && 'CONNECTING TO SERVER...'}
                  {formStatus === 'success' && 'ENQUIRY LOGGED!'}
                </button>

                <p className="enq-modal-footer">
                  By submitting, you agree to our <span>Privacy Policy</span> and <span>Terms of Service</span>.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
