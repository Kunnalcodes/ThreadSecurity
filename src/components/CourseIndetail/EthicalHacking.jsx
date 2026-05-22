import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './EthicalHacking.css';

function EthicalHacking() {
    const course = courseData['ethical-hacking'];
    return (
        <CourseLayout course={course} themeClass="theme-ethical-hacking" />
    );
}

export default EthicalHacking;
