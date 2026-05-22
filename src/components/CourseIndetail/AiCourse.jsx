import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './AiCourse.css';

function AiCourse() {
    const course = courseData['ai-course'];
    return (
        <CourseLayout course={course} themeClass="theme-ai-course" />
    );
}

export default AiCourse;
