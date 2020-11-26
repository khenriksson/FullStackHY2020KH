import React from 'react';
import { useParams } from 'react-router-dom';
import { Patient, IdPatient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient } from '../state';
import { Icon } from 'semantic-ui-react';
import HospitalEntryBox from './HospitalEntry';
import OccupationalHealthEntry from './OccupationalHealthEntry';
import HealthCheckBox from './HealthCheckEntry';
import { Entry } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckBox entry={entry} />;
    case 'Hospital':
      return <HospitalEntryBox entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};

const PatientInformation: React.FC = () => {
  const params: IdPatient = useParams();
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  //   console.log('patients :>> ', patients);
  //   console.log('patient[params.id] :>> ', patients[params.id]);
  console.log('diagnosis :>> ', diagnosis);
  //   let result = params.map((a) => a.id);

  //   const [, dispatch] = useStateValue();
  const id = params.id;

  React.useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${params.id}`
        );
        console.log('FETCHES');
        dispatch(setPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient[id.toString()]) {
      fetchPatient();
    }
  }, [dispatch]);
  const myPatient = () => patient[id.toString()];
  console.log('patient :>> ', patient);

  const icon = () => {
    if (patient[id.toString()]?.gender === 'male') {
      return <Icon name="mars" size="large" />;
    } else if (patient[id.toString()]?.gender === 'female') {
      return <Icon name="venus" size="large" />;
    } else {
      return <Icon name="genderless" size="large" />;
    }
  };
  //   console.log('params.id :>> ', params.id);
  //   console.log('patient?.id?.dateOfBirth :>> ', patient[id.toString()]);
  return (
    <div>
      <h2>
        {patient[id.toString()]?.name} {icon()}
      </h2>

      <p>ssn: {patient[id.toString()]?.ssn}</p>
      <p>Occupation: {patient[id.toString()]?.occupation}</p>

      <h2>Entries: </h2>
      {patient[id.toString()]?.entries.map((entry) => {
        return (
          <>
            {entry.diagnosisCodes?.map((diagnose) => (
              <li>
                {diagnose}: {diagnosis[diagnose]?.name}
              </li>
            ))}
            <EntryDetails entry={entry} />
          </>
        );
      })}
    </div>
  );
};

export default PatientInformation;
