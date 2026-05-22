import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './RedTeaming.css';

function RedTeaming() {
    const course = courseData['red-teaming'];
    return (
        <CourseLayout course={course} themeClass="theme-red-teaming" />
    );
}

export default RedTeaming;
