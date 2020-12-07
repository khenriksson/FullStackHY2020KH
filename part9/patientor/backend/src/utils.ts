import { Gender, HealthCheckRating, NewEntry, NewPatient } from './types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing: ' + comment);
  }
  return comment; // Knows that comment is string
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export const toNewPatient = (object: any): NewPatient => {
  // Since the idea of this function is to map fields of unknown type to fields of the correct type and check whether they are defined as expected, this might be the rare case where we actually want to allow the any type.
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [],
  };
};

export const toNewEntry = (object: any): NewEntry => {
  if ((object.type = 'Hospital')) {
    return {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: object.type,
      discharge: {
        date: object.discharge.date,
        criteria: object.discharge.criteria,
      },
    };
  } else if ((object.type = 'OccupationalHealthcare')) {
    return {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: object.type,
      employerName: parseString(object.employerName),
      sickLeave: {
        startDate: parseDate(object.sickLeave.startDate),
        endDate: parseDate(object.sickLeave.endDate),
      },
    };
  } else {
    return {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: object.diagnosisCodes,
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  }
};
