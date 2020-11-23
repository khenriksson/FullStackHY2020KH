import patientsData from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientData = (id: string): PublicPatient => {
  console.log(
    'patients.filter(p => p.id ===id) :>> ',
    patients.filter((p) => p.id === id)[0]
  );
  const patient = patients.filter((p) => {
    return p.id === id;
  })[0];

  return patient;
};

const addEntry = (entry: NewPatient): Patient => {
  const id = uuidv4();
  console.log('id :>> ', id);
  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPatientData,
};
