import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('id :>> ', id);
  const patient = patientService.getPatientData(id);
  console.log('patient :>> ', patient);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addEntry(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

  // const addedPatient = diary
  //   const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  //   const newPatient = patientService.addEntry({
  //     name,
  //     dateOfBirth,
  //     ssn,
  //     gender,
  //     occupation,
  //   });
});

export default router;
