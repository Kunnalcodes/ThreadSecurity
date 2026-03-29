import Navbar from '../components/Navbar/Navbar';
// import TrustSignals from '../components/TrustSignals/TrustSignals';
import FullPageScroll from '../components/FullPageScroll/FullPageScroll';
import HeroSection from '../components/HeroSection/HeroSection';
// import CertifiedExcellence from '../components/CertifiedExcellence/CertifiedExcellence';
import Features from '../components/Features/Features';
import DifferentiationPoints from '../components/DifferentiationPoints/DifferentiationPoints';
import Methodology from '../components/Methodology/Methodology';
// import SkillAssessment from '../components/SkillAssessment/SkillAssessment';
import CourseLineup from '../components/CourseLineup/CourseLineup';
import ProgramStructure from '../components/ProgramStructure/ProgramStructure';
// import Roadmap from '../components/Roadmap/Roadmap';
import Career from '../components/Career/Career';
import MeetTheExperts from '../components/MeetTheExperts/MeetTheExperts';
import HallOfFame from '../components/HallOfFame/HallOfFame';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import CTA from '../components/CTA/CTA';
import Enquiry from '../components/Enquiry/Enquiry';
import Footer from '../components/Footer/Footer';
import Vision from '../components/Vision/Vision';

function HomePage() {
    return (
        <>
            <Navbar />
            <FullPageScroll>
                <HeroSection />
                {/* <CertifiedExcellence />
                <TrustSignals /> */}
                <Features />
                {/* <DifferentiationPoints /> */}
                <Methodology />
                {/* <SkillAssessment /> */}
                <CourseLineup />
                <ProgramStructure />
                {/* <Roadmap /> */}
                <Career />
                <MeetTheExperts />
                <HallOfFame />
                <Testimonials />
                <FAQ />
                <CTA />
                <Vision/>
                {/* Enquiry + Footer share one snap section so they don't overlap */}
                <div>
                    <Enquiry />
                    <Footer />
                </div>
            </FullPageScroll>
        </>
    );
}

export default HomePage;
