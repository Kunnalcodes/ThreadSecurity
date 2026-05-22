import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './DeepLearning.css';

function DeepLearning() {
    const course = courseData['deep-learning'];
    return (
        <CourseLayout course={course} themeClass="theme-deep-learning" />
    );
}

export default DeepLearning;
