export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CourseDesc extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CourseDesc {
  name: 'Fundamentals';
}

export interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface CoursePartThree extends CourseDesc {
  name: 'Deeper type usage';

  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartBase {
  name: 'Even deeper type usage';
  description: string;
}

export type TypePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
