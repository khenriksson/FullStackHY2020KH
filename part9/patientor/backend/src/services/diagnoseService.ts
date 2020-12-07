import diagnoseData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = (diagnosisCode: Diagnosis) => {
  const newDiagnosis = {
    ...diagnosisCode,
  };
  diagnoses.push(newDiagnosis);
  return newDiagnosis;
};

export default {
  getEntries,
  addEntry,
};
