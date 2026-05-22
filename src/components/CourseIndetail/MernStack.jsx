import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './MernStack.css';

function MernStack() {
    const course = courseData['mern-stack'];
    return (
        <CourseLayout course={course} themeClass="theme-mern-stack" />
    );
}

export default MernStack;
