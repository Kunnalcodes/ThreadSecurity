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
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
