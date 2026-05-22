import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './Kotlin.css';

function Kotlin() {
    const course = courseData['kotlin'];
    return (
        <CourseLayout course={course} themeClass="theme-kotlin" />
    );
}

export default Kotlin;
