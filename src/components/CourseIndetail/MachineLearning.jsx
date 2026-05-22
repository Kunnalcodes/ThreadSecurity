import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './MachineLearning.css';

function MachineLearning() {
    const course = courseData['machine-learning'];
    return (
        <CourseLayout course={course} themeClass="theme-machine-learning" />
    );
}

export default MachineLearning;
