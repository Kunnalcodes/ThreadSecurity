import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './WebDevelopment.css';

function WebDevelopment() {
    const course = courseData['web-development'];
    return (
        <CourseLayout course={course} themeClass="theme-web-development" />
    );
}

export default WebDevelopment;
