import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header course={course} />
            <Content part={course.parts} />
        </div>
    );
}

export default Course;