import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import SecurityDashboard from './components/SecurityDashboard/SecurityDashboard';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MentorshipPage from './pages/MentorshipPage';

// Course In-detail page imports
import EthicalHacking from './components/CourseIndetail/EthicalHacking';
import PenetrationTesting from './components/CourseIndetail/PenetrationTesting';
import RedTeaming from './components/CourseIndetail/RedTeaming';
import NetworkSecurity from './components/CourseIndetail/NetworkSecurity';
import CloudSecurity from './components/CourseIndetail/CloudSecurity';
import PythonForSecurity from './components/CourseIndetail/PythonForSecurity';
import CPlusPlus from './components/CourseIndetail/CPlusPlus';
import WebDevelopment from './components/CourseIndetail/WebDevelopment';
import MernStack from './components/CourseIndetail/MernStack';
import Kotlin from './components/CourseIndetail/Kotlin';
import MachineLearning from './components/CourseIndetail/MachineLearning';
import DataScience from './components/CourseIndetail/DataScience';
import DeepLearning from './components/CourseIndetail/DeepLearning';
import AiCourse from './components/CourseIndetail/AiCourse';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/__dashboard" element={<SecurityDashboard />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          
          {/* Detailed Course Routes */}
          <Route path="/course/ethical-hacking" element={<EthicalHacking />} />
          <Route path="/course/penetration-testing" element={<PenetrationTesting />} />
          <Route path="/course/red-teaming" element={<RedTeaming />} />
          <Route path="/course/network-security" element={<NetworkSecurity />} />
          <Route path="/course/cloud-security" element={<CloudSecurity />} />
          <Route path="/course/python-for-security" element={<PythonForSecurity />} />
          <Route path="/course/c-cpp" element={<CPlusPlus />} />
          <Route path="/course/web-development" element={<WebDevelopment />} />
          <Route path="/course/mern-stack" element={<MernStack />} />
          <Route path="/course/kotlin" element={<Kotlin />} />
          <Route path="/course/machine-learning" element={<MachineLearning />} />
          <Route path="/course/data-science" element={<DataScience />} />
          <Route path="/course/deep-learning" element={<DeepLearning />} />
          <Route path="/course/ai-course" element={<AiCourse />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

