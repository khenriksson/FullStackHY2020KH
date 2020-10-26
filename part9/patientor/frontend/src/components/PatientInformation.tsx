import React from 'react';
import { useParams } from 'react-router-dom';
import { Patient, IdPatient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientInformation: React.FC = () => {
  const params: IdPatient = useParams();
  const [{ patients }, dispatch] = useStateValue();
  console.log('patients :>> ', patients);
  console.log('patient[params.id] :>> ', patients[params.id]);
  const myPatient = patients[params.id];

  //   let result = params.map((a) => a.id);

  //   const [, dispatch] = useStateValue();

  //   const myPatient = state//   React.useEffect(() => {
  //     // axios.get<void>(`${apiBaseUrl}/ping`);

  //     const fetchPatient = async () => {
  //       try {
  //         const { data: patient } = await axios.get<Patient>(
  //           `${apiBaseUrl}/${params}`
  //         );
  //         dispatch({ type: 'SET_PATIENT', payload: patient });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     };
  //     fetchPatient();
  //   }, [dispatch]);

  console.log('params.id :>> ', params.id);
  return (
    <div>
      <p>{myPatient?.dateOfBirth}</p>
      <p>{myPatient?.name} </p>
    </div>
  );
};

export default PatientInformation;
