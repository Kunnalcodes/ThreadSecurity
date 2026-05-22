import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './NetworkSecurity.css';

function NetworkSecurity() {
    const course = courseData['network-security'];
    return (
        <CourseLayout course={course} themeClass="theme-network-security" />
    );
}

export default NetworkSecurity;
