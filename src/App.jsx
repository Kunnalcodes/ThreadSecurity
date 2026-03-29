import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import SecurityDashboard from './components/SecurityDashboard/SecurityDashboard';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/dashboard" element={<SecurityDashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
