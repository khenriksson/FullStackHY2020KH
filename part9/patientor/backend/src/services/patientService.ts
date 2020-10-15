import patientsData from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
