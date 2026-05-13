import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CTA.css';

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 0.8, 0.36, 1] } },
};

function CTA() {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const DOT = 4;
        const GAP = 10;
        const COLOR = '#22c55e';

        let W, H, cols, rows;
        let mouse = { x: -9999, y: -9999 };
        let dots = [];
        let animId;

        function resize() {
            W = canvas.width = canvas.parentElement.offsetWidth;
            H = canvas.height = canvas.parentElement.offsetHeight;
            cols = Math.ceil(W / GAP) + 1;
            rows = Math.ceil(H / GAP) + 1;
            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dots.push({ c, r, scale: 0, vel: 0 });
                }
            }
        }

        function animate(ts) {
            const time = ts * 0.001;
            ctx.clearRect(0, 0, W, H);

            dots.forEach((d) => {
                const x = d.c * GAP;
                const y = d.r * GAP;

                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repel = Math.max(0, 1 - dist / 140);

                const wave = 0.25 + 0.18 * Math.sin(time * 1.2 - (d.c + d.r) * 0.28);
                const target = wave + repel * 1.4;
                d.vel += (target - d.scale) * 0.12;
                d.vel *= 0.78;
                d.scale += d.vel;
                d.scale = Math.max(0, d.scale);

                const r = (DOT / 2) * Math.min(d.scale, 1.8);
                if (r < 0.3) return;

                const alpha = Math.min(0.85, d.scale * 0.55 + repel * 0.4);
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = COLOR;
                ctx.globalAlpha = alpha;
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(animate);
        }

        resize();
        animId = requestAnimationFrame(animate);

        window.addEventListener('resize', resize);

        const section = sectionRef.current;
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        if (section) {
            section.addEventListener('mousemove', onMove);
            section.addEventListener('mouseleave', onLeave);
        }

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            if (section) {
                section.removeEventListener('mousemove', onMove);
                section.removeEventListener('mouseleave', onLeave);
            }
        };
    }, []);

    return (
        <section className="cta-section" ref={sectionRef}>
            <canvas className="cta-canvas" ref={canvasRef} />
            <div className="cta-mask" />

            <motion.div
                className="cta-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
            >
                <motion.div className="cta-badge" variants={item}>Join the Next Cohort</motion.div>
                <motion.h2 className="cta-heading" variants={item}>
                    Ready to <span>Secure</span>
                    <br />
                    the Future?
                </motion.h2>
                <motion.p className="cta-sub" variants={item}>
                    Join the next cohort of world-class security professionals. Elite
                    training, real labs, lifetime alumni access.
                </motion.p>
                <motion.div className="cta-actions" variants={item}>
                    <a href="#enquiry" className="cta-btn-primary">
                        Apply for Admission
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a href="#career" className="cta-btn-ghost">
                        View Curriculum
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" width="16" height="16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
                <motion.div className="cta-trust-strip" variants={item}>
                    {['12,000+ graduates', '98% placement rate', 'ISO certified', 'Tier-1 instructors'].map(
                        (txt) => (
                            <div className="cta-trust-item" key={txt}>
                                <svg fill="currentColor" viewBox="0 0 20 20" width="14" height="14">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {txt}
                            </div>
                        )
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}

export default CTA;
