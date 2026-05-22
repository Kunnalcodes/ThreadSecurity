import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './DataScience.css';

function DataScience() {
    const course = courseData['data-science'];
    return (
        <CourseLayout course={course} themeClass="theme-data-science" />
    );
}

export default DataScience;
