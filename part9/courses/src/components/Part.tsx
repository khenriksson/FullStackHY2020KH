import React from 'react';
import {
  CoursePartBase,
  CoursePartOne,
  CoursePartTwo,
  CoursePartThree,
  CoursePartFour,
} from '../interfaces/courseParts';

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div key={part.name}>
          <p>
            {part.name} {part.exerciseCount}
          </p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div key={part.name}>
          <p>
            {part.name} {part.exerciseCount} {part.groupProjectCount}
          </p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div key={part.name}>
          <p>
            {part.name} {part.exerciseCount} {part.exerciseSubmissionLink}
          </p>
        </div>
      );
    case 'Even deeper type usage':
      return (
        <div key={part.name}>
          <p>
            {part.name} {part.exerciseCount} {part.description}
          </p>
        </div>
      );
  }
};

export default Part;
