import React from "react";


const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
    const sum =
        course.parts[0].exercises +
        course.parts[1].exercises +
        course.parts[2].exercises;
    return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Content = ( {course} ) => {
    return (
        <div>
            
        {course.parts.map(item => <Part key={item.name} part={item} />)}
        </div>
    );
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
        </div>
    );

}


export default Course