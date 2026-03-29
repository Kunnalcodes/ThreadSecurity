import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import CourseLineup from '../components/CourseLineup/CourseLineup';
import ProgramStructure from '../components/ProgramStructure/ProgramStructure';
import CertificationModel from '../components/CertificationModel/CertificationModel';
import Roadmap from '../components/Roadmap/Roadmap';
import Career from '../components/Career/Career';
import Enquiry from '../components/Enquiry/Enquiry';
import Footer from '../components/Footer/Footer';

function CoursePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <CourseLineup />
                <ProgramStructure />
                <CertificationModel />
                <Roadmap />
                <Career />
                <Enquiry />
            </main>
            <Footer />
        </>
    );
}

export default CoursePage;
