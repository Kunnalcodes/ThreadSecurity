import { useRef, useState, useEffect, createContext, useContext } from 'react';
import './FullPageScroll.css';

/* ── Context for child sections to know their active state ── */
const ScrollContext = createContext({ activeIndex: 0 });
export const useScrollContext = () => useContext(ScrollContext);

function FullPageScroll({ children }) {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const childCount = Array.isArray(children) ? children.length : 1;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Clear previous timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            setIsScrolling(true);

            // Calculate active section based on scroll position
            const scrollTop = container.scrollTop;
            const sectionHeight = container.clientHeight;
            const index = Math.round(scrollTop / sectionHeight);
            setActiveIndex(Math.min(Math.max(0, index), childCount - 1));

            // Reset scrolling state after user stops
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        const handleWheel = (e) => {
            // Allow free scrolling - no preventDefault
            // Scroll snap will handle the snapping naturally
        };

        const handleTouchStart = () => {
            setIsScrolling(true);
        };

        const handleTouchEnd = () => {
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        container.addEventListener('wheel', handleWheel, { passive: true });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [childCount]);

    const scrollToSection = (index) => {
        const container = containerRef.current;
        if (!container) return;
        
        const targetScroll = index * container.clientHeight;
        container.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
        });
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' && activeIndex < childCount - 1) {
                e.preventDefault();
                scrollToSection(activeIndex + 1);
            } else if (e.key === 'ArrowUp' && activeIndex > 0) {
                e.preventDefault();
                scrollToSection(activeIndex - 1);
            } else if (e.key === 'Home') {
                e.preventDefault();
                scrollToSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                scrollToSection(childCount - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, childCount]);

    return (
        <ScrollContext.Provider value={{ activeIndex, isScrolling }}>
            <div className="fps-container" ref={containerRef}>
                {Array.isArray(children) ? children.map((child, i) => (
                    <div
                        className={`fps-section ${activeIndex === i ? 'fps-section--active' : ''}`}
                        key={i}
                        data-section-index={i}
                    >
                        {child}
                    </div>
                )) : (
                    <div className="fps-section fps-section--active" data-section-index={0}>
                        {children}
                    </div>
                )}

                {/* Navigation Dots */}
                <nav className="fps-dots" aria-label="Section navigation">
                    {Array.from({ length: childCount }).map((_, i) => (
                        <button
                            key={i}
                            className={`fps-dot ${activeIndex === i ? 'active' : ''}`}
                            onClick={() => scrollToSection(i)}
                            aria-label={`Go to section ${i + 1}`}
                            aria-current={activeIndex === i ? 'true' : 'false'}
                        />
                    ))}
                </nav>


            </div>
        </ScrollContext.Provider>
    );
}

export default FullPageScroll;
