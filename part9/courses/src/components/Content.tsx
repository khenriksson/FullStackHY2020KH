import React from 'react';

interface ContentPropsChildren {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: ContentPropsChildren[];
}

const Content = (props: ContentProps) => {
  const courseParts = props.courses;
  return (
    <>
      {courseParts.map((course) => {
        return (
          <div key={course.name}>
            <p>
              {course.name} {course.exerciseCount}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Content;
