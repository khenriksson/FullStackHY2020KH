import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Total from './components/Total';
import Content from './components/Content';
import {
  CoursePartOne,
  CoursePartTwo,
  CoursePartThree,
  CoursePartFour,
} from './interfaces/courseParts';

/*

Your first task is to to declare a new interface, that includes the description 
attribute and extends the CoursePartBase interface. Then modify the code so that
you can remove the description attribute from both CoursePartOne and CoursePartThree 
without getting any errors.
*/ type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  // new types

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Even deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
    },
  ];

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
