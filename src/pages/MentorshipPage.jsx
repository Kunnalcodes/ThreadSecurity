import Navbar from '../components/Navbar/Navbar';
import MentorSection from '../components/MentorSection/MentorSection';
import Enquiry from '../components/Enquiry/Enquiry';
import Footer from '../components/Footer/Footer';

function MentorshipPage() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '80px' }}>
                <MentorSection />
                <Enquiry />
            </main>
            <Footer />
        </>
    );
}

export default MentorshipPage;
