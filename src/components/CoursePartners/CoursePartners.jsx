import { Briefcase, Check } from 'lucide-react';
import './CoursePartners.css';

const PARTNERS = ['PwC', 'BugThrive', 'BrightXR', 'Inficom Solutions', 'Dedsecops'];

const ROLES = [
    'Security Analyst', 'Ethical Hacker', 'Application Security Engineer',
    'SOC Analyst', 'Penetration Tester', 'Threat Intelligence Analyst',
];

export default function CoursePartners() {
    // Duplicate for seamless infinite scroll
    const doubled = [...PARTNERS, ...PARTNERS];

    return (
        <section className="cp-section">
            <div className="cp-inner">
                <div className="cp-label">
                    <Briefcase size={13} />
                    Career Network
                </div>
                <h2 className="cp-title">
                    Placement <span className="cp-grad">Partners</span>
                </h2>
                <p className="cp-sub">
                    Upon completion, you're eligible for placement with our trusted industry partner
                    network — covering top cybersecurity firms and product companies.
                </p>

                {/* Infinite ticker */}
                <div className="cp-track" aria-label="Partner logos">
                    <div className="cp-scroll">
                        {doubled.map((p, i) => (
                            <div key={i} className="cp-chip">
                                <Briefcase size={13} className="cp-chip-icon" />
                                <span>{p}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Role tags */}
                <h4 className="cp-roles-heading">Career Roles You'll Be Ready For</h4>
                <div className="cp-roles">
                    {ROLES.map(role => (
                        <div key={role} className="cp-role-tag">
                            <Check size={13} className="cp-role-check" />
                            {role}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
