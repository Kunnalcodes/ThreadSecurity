import { motion } from 'framer-motion';

/* ════════════════════════════════════════════════════
   Reusable Animation Variants
   – GPU-accelerated · Subtle distances · No jitter
   ════════════════════════════════════════════════════ */
export const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scaleIn: {
        hidden: { opacity: 0, scale: 0.96 },
        visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
    },
    slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
    /* Title pop — scale + fade for big headlines */
    popIn: {
        hidden: { opacity: 0, y: 14, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
    },
    /* Cinematic clip-path reveal for subtitles */
    clipReveal: {
        hidden: { opacity: 0, y: 8, clipPath: 'inset(100% 0% 0% 0%)' },
        visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' },
    },
};

/* Smooth, professional easing */
const EASE = [0.22, 0.8, 0.36, 1];

/* ════════════════════════════════════════════════════
   Stagger Container
   ════════════════════════════════════════════════════ */
export const staggerContainer = (staggerDelay = 0.12) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
        },
    },
});

/* ════════════════════════════════════════════════════
   SectionHeader — Unified title/subtitle animation
   Usage:
   <SectionHeader
     eyebrow="Thread Security Academy"
     title="Why We Stand Out"
     subtitle="Built for learners who want real skills."
     className="features-header"
   />
   ════════════════════════════════════════════════════ */
export function SectionHeader({
    eyebrow,
    title,
    titleAccent,
    subtitle,
    className = '',
    align = 'center',
    once = true,
    amount = 0.3,
}) {
    return (
        <motion.div
            className={className}
            style={{
                textAlign: align,
                willChange: 'opacity, transform',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={staggerContainer(0.14)}
        >
            {eyebrow && (
                <motion.span
                    className="eyebrow"
                    variants={variants.fadeIn}
                    transition={{ duration: 0.6, ease: EASE }}
                    style={{ display: 'inline-block' }}
                >
                    {eyebrow}
                </motion.span>
            )}

            <motion.h2
                className="headline"
                variants={variants.popIn}
                transition={{ duration: 0.9, ease: EASE }}
            >
                {titleAccent ? (
                    <>
                        {title}{' '}
                        <span className="accent">{titleAccent}</span>
                    </>
                ) : (
                    title
                )}
            </motion.h2>

            {subtitle && (
                <motion.p
                    className="subheadline"
                    variants={variants.clipReveal}
                    transition={{ duration: 0.8, ease: EASE }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════
   AnimatedSection Wrapper
   ════════════════════════════════════════════════════ */
function AnimatedSection({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 1.0,
    className = '',
    style = {},
    once = true,
    amount = 0.15,
    as = 'div',
    ...props
}) {
    const Component = motion[as] || motion.div;
    const selectedVariant = typeof variant === 'string' ? variants[variant] : variant;

    return (
        <Component
            className={className}
            style={{ willChange: 'opacity, transform', ...style }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={selectedVariant}
            transition={{
                duration,
                delay,
                ease: EASE,
            }}
            {...props}
        >
            {children}
        </Component>
    );
}

/* ════════════════════════════════════════════════════
   StaggerWrapper — for animating children
   with stagger delay
   ════════════════════════════════════════════════════ */
export function StaggerWrapper({
    children,
    staggerDelay = 0.12,
    className = '',
    style = {},
    once = true,
    amount = 0.15,
    ...props
}) {
    return (
        <motion.div
            className={className}
            style={{ willChange: 'opacity, transform', ...style }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={staggerContainer(staggerDelay)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════
   AnimatedItem — for use inside StaggerWrapper
   ════════════════════════════════════════════════════ */
export function AnimatedItem({
    children,
    variant = 'fadeUp',
    duration = 1.0,
    className = '',
    style = {},
    ...props
}) {
    const selectedVariant = typeof variant === 'string' ? variants[variant] : variant;

    return (
        <motion.div
            className={className}
            style={{ willChange: 'opacity, transform', ...style }}
            variants={selectedVariant}
            transition={{
                duration,
                ease: EASE,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedSection;
