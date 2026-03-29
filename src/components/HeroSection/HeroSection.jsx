import { useRef, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import './HeroSection.css';

/* ── 3D Robot Mascot ── */
// Use a constant cache buster evaluated once to bypass Chrome's blockfile cache bug
// without causing infinite renders in React Suspense.
const modelUrl = `./robot_playground.glb?cb=${Date.now()}`;

function RobotModel() {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef();

  // Wave movement / Floating
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.2;
      groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.05;
      groupRef.current.rotation.x = 0.15 + Math.cos(t * 0.8) * 0.03;
    }
  });

  // Apply Black & Green theme to materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // We can create a cyber-glow effect by using a dark base and green emissive
        child.material.color.set('#0a0a0a'); // Very dark black
        if (child.material.emissive) {
          child.material.emissive.set('#00ff41'); // Neon green glow
          child.material.emissiveIntensity = 1.2;
        }
        child.material.roughness = 0.1;
        child.material.metalness = 0.8;
      }
    });
  }, [scene]);

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={2.4}
      position={[0, -0.2, 0]}
    />
  );
}
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

/* ── Main Hero ── */
export default function HeroSection() {
  const [btnState, setBtnState] = useState('idle'); // idle | loading | done
  const [progress, setProgress] = useState(0);

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

      {/* ── FULL SCREEN 3D CANVAS ── */}
      <div className="hero-3d-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-2, 2, 2]} intensity={1.5} color="#00ff41" />
          <pointLight position={[2, -2, 1]} intensity={0.6} color="#00ccff" />
          <Suspense fallback={null}>
            {/* We position the whole group to the right-ish area of the screen */}
            <group position={[3.5, -1.8, 0]}>
              <RobotModel />
            </group>
            <Environment preset="night" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="hs-inner">

        {/* ── LEFT ── */}
        <motion.div 
          className="hs-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >

          <div className="badge">
            <span className="badge-ping" />
            <span className="badge-text">ISO 27001 Certified</span>
          </div>

          <TerminalWelcome />

          <h1 className="hs-title">
            <span className="title-dim">Secure the</span>
            <span className="title-main">Digital<br />Frontier</span>
            <span className="title-sub">Before It Secures You.</span>
          </h1>

          <p className="hs-desc">
            Elite cybersecurity training built for operators who move fast.
            Simulate real attacks, master zero-day defenses, and earn credentials
            that matter on the ground — not just on paper.
          </p>

          

          {/* CTAs */}
          <div className="cta-row">
            <button className="btn-primary">
              <span>Start Training</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </button>

            <button
              className={`btn-enroll ${btnState}`}
              onClick={() => btnState === 'idle' && setBtnState('loading')}
              disabled={btnState === 'loading'}
            >
              {btnState === 'idle' && <><span className="enroll-icon">⬡</span> Enroll Free</>}
              {btnState === 'loading' && <><span className="enroll-progress">{progress}%</span> Registering…</>}
              {btnState === 'done' && <><span className="enroll-icon">✓</span> Access Granted</>}
              {btnState === 'loading' && (
                <span className="enroll-bar">
                  <span className="enroll-fill" style={{ width: `${progress}%` }} />
                </span>
              )}
            </button>

            <button className="btn-ghost">
              View Curriculum ↗
            </button>
          </div>

        </motion.div>

        {/* ── RIGHT — empty spacer or decorative rings ── */}
        <motion.div 
          className="hs-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          {/* Decorative rings */}
          <div className="ring ring-1" />
          <div className="ring ring-2" />
        </motion.div>

      </div>

      {/* Bottom ticker */}
      <Ticker />

      {/* Corner brackets */}
      <span className="cb cb-tl" /><span className="cb cb-tr" />
      <span className="cb cb-bl" /><span className="cb cb-br" />
    </section>
  );
}
