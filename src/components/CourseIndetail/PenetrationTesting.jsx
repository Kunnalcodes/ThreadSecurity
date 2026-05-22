import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './PenetrationTesting.css';

function PenetrationTesting() {
    const course = courseData['penetration-testing'];
    return (
        <CourseLayout course={course} themeClass="theme-penetration-testing" />
    );
}

export default PenetrationTesting;
