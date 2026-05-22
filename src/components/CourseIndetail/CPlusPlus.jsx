import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './CPlusPlus.css';

function CPlusPlus() {
    const course = courseData['c-cpp'];
    return (
        <CourseLayout course={course} themeClass="theme-c-cpp" />
    );
}

export default CPlusPlus;
