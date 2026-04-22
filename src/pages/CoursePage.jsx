import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import CourseHero from '../components/CourseHero/CourseHero';
import CourseOverview from '../components/CourseOverview/CourseOverview';
import ProgramPedagogy from '../components/ProgramPedagogy/ProgramPedagogy';
import CourseCurriculum from '../components/CourseCurriculum/CourseCurriculum';
import CourseRoadmap from '../components/CourseRoadmap/CourseRoadmap';
import CourseLineup from '../components/CourseLineup/CourseLineup';
import AICourses from '../components/AICourses/AICourses';
import CourseInstructors from '../components/CourseInstructors/CourseInstructors';
import CoursePartners from '../components/CoursePartners/CoursePartners';
import CourseEnroll from '../components/CourseEnroll/CourseEnroll';
import Enquiry from '../components/Enquiry/Enquiry';
import './CoursePage.css';

function CoursePage() {
    return (
        <>
            <Navbar />
            <main className="cp-main">
                {/* 1. Hero — glassmorphism, particles, stat orbs */}
                <CourseHero />

                {/* 2. Why this training — 6-card overview grid */}
                <CourseOverview />

                {/* 3. Program Pedagogy — how we teach */}
                <ProgramPedagogy />

                {/* 4. Course Lineup — existing angled stripe slider (cyber security courses) */}
                <CourseLineup />

                {/* 5. AI & ML Programs — full AI course section */}
                <AICourses />

                {/* 6. Curriculum — 8-phase scroll-animated accordion */}
                <CourseCurriculum />

                {/* 7. Roadmap — animated 45-day timeline */}
                <CourseRoadmap />

                {/* 8. Instructors — avatar ring cards */}
                <CourseInstructors />

                {/* 9. Placement partners + job roles */}
                <CoursePartners />

                {/* 10. Enrollment — glassmorphism form + Excel download */}
                <CourseEnroll />

                {/* 11. General Enquiry */}
                <Enquiry />
            </main>
            <Footer />
        </>
    );
}

export default CoursePage;
