import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './PythonForSecurity.css';

function PythonForSecurity() {
    const course = courseData['python-for-security'];
    return (
        <CourseLayout course={course} themeClass="theme-python-for-security" />
    );
}

export default PythonForSecurity;
