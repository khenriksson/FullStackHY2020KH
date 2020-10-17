import React from 'react';

interface TotalPropsChildren {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courses: TotalPropsChildren[];
}

const Total = (props: TotalProps) => {
  const courseParts = props.courses;
  console.log('courseParts :>> ', courseParts);
  return (
    <>
      <p>
        Number of exercises{' '}
        {courseParts.reduce(
          (carry: number, part) => carry + part.exerciseCount,
          0
        )}
      </p>
    </>
  );
};

export default Total;
