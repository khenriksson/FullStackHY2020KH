import React from 'react';
import { useParams } from 'react-router-dom';
import { Patient, IdPatient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientInformation: React.FC = () => {
  const params: IdPatient = useParams();
  const [{ patient }, dispatch] = useStateValue();
  //   console.log('patients :>> ', patients);
  //   console.log('patient[params.id] :>> ', patients[params.id]);

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
        console.log('patient :>> ', patient);
        dispatch({ type: 'SET_PATIENT', payload: patient });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch]);
  const myPatient = patient;
  console.log('patient :>> ', patient);
  console.log('params.id :>> ', params.id);
  console.log('patient?.id?.dateOfBirth :>> ', patient[id.toString()]);
  return (
    <div>
      <p>Name: {patient[id.toString()]?.name} </p>
      <p>Date of Birth: {patient[id.toString()]?.dateOfBirth}</p>
    </div>
  );
};

export default PatientInformation;
