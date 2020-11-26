import React from 'react';
import { Grid } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import { Icon } from 'semantic-ui-react';

const HeartRating: React.FC<{ rating: number }> = ({ rating }) => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="red" />;
    case 1:
      return <Icon name="heart" color="green" />;
    case 2:
      return <Icon name="heart" color="yellow" />;
    default:
      return <Icon name="heart" color="black" />;
  }
};

const HealthCheckBox: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  console.log('entry :>> ', entry);
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <HeartRating rating={entry?.healthCheckRating} />
    </div>
  );
};

export default HealthCheckBox;
