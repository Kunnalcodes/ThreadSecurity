import { useRef, useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import './CourseInstructors.css';

// Import Images
import sujalImg from '../../assets/IMG_20260419_143752.jpg.jpeg';
import vishalImg from '../../assets/IMG_20260419_143254.jpg.jpeg';


const INSTRUCTORS = [
    {
        name: 'Vishal Kumar',
        role: 'Founder & CEO',
        org: 'Thread Security',
        bio: 'Strategic and technical leadership rooted in offensive security research and real-world cyber defense. Led security engagements for 50+ companies, helping organizations uncover critical vulnerabilities and transform offensive insights into robust defensive strategies.',
        skills: ['Ethical Hacking', 'Offensive Security', 'Vulnerability Assessment', 'Cyber Defense'],
        color: '#5dd62c',
        initials: 'VK',
        image: vishalImg,
    },
    {
        name: 'Sujal Tiwari',
        role: 'Chief Technology Officer',
        org: 'Thread Security',
        bio: 'Leads technology strategy, product development, and operational execution at Thread Security. Strong background in cybersecurity and offensive research with an execution-driven approach to developing resilient and scalable security systems.',
        skills: ['System Architecture', 'Product Development', 'Cybersecurity Research', 'Scalable Systems'],
        color: '#f4bbff',
        initials: 'ST',
        image: sujalImg,
    },
];


function InstructorCard({ inst }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`ci-card ${visible ? 'ci-card--in' : ''}`}
            style={{ '--inst-color': inst.color }}
        >
            {/* Avatar */}
            <div className="ci-avatar-wrap">
                <div className="ci-avatar-ring" />
                <div className="ci-avatar">
                    {inst.image ? (
                        <img src={inst.image} alt={inst.name} className="ci-img" />
                    ) : (
                        <span className="ci-initials">{inst.initials}</span>
                    )}
                </div>
            </div>


            {/* Info */}
            <div className="ci-info">
                <h3 className="ci-name">{inst.name}</h3>
                <span className="ci-role">{inst.role}</span>
                <span className="ci-org">{inst.org}</span>
                <p className="ci-bio">{inst.bio}</p>
                <div className="ci-skills">
                    {inst.skills.map(s => (
                        <span key={s} className="ci-skill">{s}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CourseInstructors() {
    return (
        <section id="instructors" className="ci-section">
            <div className="ci-inner">
                <div className="ci-label">
                    <Users size={13} />
                    Meet the Team
                </div>
                <h2 className="ci-title">
                    Your <span className="ci-grad">Instructors</span>
                </h2>
                <p className="ci-sub">
                    Industry practitioners who bring real-world offensive and defensive security
                    experience into every session. Led engagements at 50+ organizations worldwide.
                </p>

                <div className="ci-grid">
                    {INSTRUCTORS.map((inst, i) => (
                        <InstructorCard key={i} inst={inst} />
                    ))}
                </div>
            </div>
        </section>
    );
}
