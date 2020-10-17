import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Total from './components/Total';
import Content from './components/Content';

const App: React.FC = () => {
  interface Part {
    name: string;
    exerciseCount: number;
  }

  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
