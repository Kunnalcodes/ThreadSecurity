import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    characters = defaultChars,
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    revealDirection = 'start',
    sequential = false,
    useOriginalCharsOnly = false,
    clickMode = false
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [inView, setInView] = useState(false);
    const [hasRun, setHasRun] = useState(false);
    const containerRef = useRef(null);

    // This state array holds the display text mapped per character
    const [displayText, setDisplayText] = useState(() => text.split(''));
    const intervalRefs = useRef([]);

    useEffect(() => {
        if (animateOn === 'view') {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (clickMode !== 'once') setHasRun(true);
                } else if (!hasRun) {
                    setInView(false);
                }
            }, { threshold: 0.1 });

            if (containerRef.current) {
                observer.observe(containerRef.current);
            }
            return () => observer.disconnect();
        }
    }, [animateOn, hasRun, clickMode]);

    const triggerAnimation = () => {
        intervalRefs.current.forEach(clearInterval);
        intervalRefs.current = [];

        const targetArray = text.split('');
        const newText = [...targetArray];
        let iterations = Array(targetArray.length).fill(0);

        const getRandomChar = (originalChar) => {
            if (useOriginalCharsOnly) {
                return targetArray[Math.floor(Math.random() * targetArray.length)];
            }
            return characters[Math.floor(Math.random() * characters.length)];
        };

        const revealOrder = [];
        if (revealDirection === 'start') {
            for (let i = 0; i < targetArray.length; i++) revealOrder.push(i);
        } else if (revealDirection === 'end') {
            for (let i = targetArray.length - 1; i >= 0; i--) revealOrder.push(i);
        } else {
            // center out
            const center = Math.floor(targetArray.length / 2);
            for (let i = 0; i < targetArray.length; i++) revealOrder.push(i);
            revealOrder.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
        }

        const runInterval = setInterval(() => {
            let allDone = true;

            for (let i = 0; i < targetArray.length; i++) {
                const charIdx = revealOrder[i];
                
                // If it's a space, keep it a space
                if (targetArray[charIdx] === ' ') {
                    newText[charIdx] = ' ';
                    continue;
                }

                // Sequential delay mechanic mapping based on configuration
                const delayThreshold = sequential ? (i * 2) : 0;

                if (iterations[charIdx] < maxIterations + delayThreshold) {
                    iterations[charIdx]++;
                    if (iterations[charIdx] > delayThreshold) {
                         newText[charIdx] = getRandomChar(targetArray[charIdx]);
                    }
                    allDone = false;
                } else {
                    newText[charIdx] = targetArray[charIdx];
                }
            }

            setDisplayText([...newText]);

            if (allDone) {
                clearInterval(runInterval);
            }
        }, speed);

        intervalRefs.current.push(runInterval);
    };

    useEffect(() => {
        const shouldAnimate = 
            (animateOn === 'hover' && isHovered) || 
            (animateOn === 'view' && inView);

        if (shouldAnimate) {
            triggerAnimation();
        } else {
            // Reset mapping
            intervalRefs.current.forEach(clearInterval);
            setDisplayText(text.split(''));
        }

        return () => intervalRefs.current.forEach(clearInterval);
    }, [isHovered, inView, text, animateOn]);

    const handleClick = () => {
        if (clickMode) {
             triggerAnimation();
        }
    }

    return (
        <span 
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {displayText.map((char, index) => {
                const isDecrypted = char === text[index];
                return (
                    <span 
                        key={index}
                        className={isDecrypted ? className : encryptedClassName}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
}
