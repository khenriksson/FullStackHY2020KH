import React from 'react';
import Part from '../components/Part';
import { TypePart } from '../interfaces/courseParts';

// interface ContentPropsChildren {
//   name: string;
//   exerciseCount: number;
// }

// interface ContentProps {
//   courses: ContentPropsChildren[];
// }

const Content: React.FC<{ courseParts: Array<TypePart> }> = ({
  courseParts,
}) => (
  <>
    {courseParts.map((course) => (
      <Part part={course} />
    ))}
  </>
);

export default Content;
