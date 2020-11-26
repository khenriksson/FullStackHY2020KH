import React from 'react';
import { Grid } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthEntry: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <p>{entry.employerName}</p>
    </div>
  );
};

export default OccupationalHealthEntry;
