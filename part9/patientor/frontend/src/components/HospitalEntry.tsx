import React from 'react';
import { Grid } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalEntryBox: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  console.log('entry :>> ', entry);
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <p>
        Discharge date: {entry.discharge.date} {entry.discharge.criteria}
      </p>
    </div>
  );
};

export default HospitalEntryBox;
