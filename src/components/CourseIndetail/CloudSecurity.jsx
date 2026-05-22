import CourseLayout from './CourseLayout';
import { courseData } from './courseData';
import './CloudSecurity.css';

function CloudSecurity() {
    const course = courseData['cloud-security'];
    return (
        <CourseLayout course={course} themeClass="theme-cloud-security" />
    );
}

export default CloudSecurity;
