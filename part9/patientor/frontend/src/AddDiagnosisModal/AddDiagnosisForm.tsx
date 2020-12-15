import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { TextField } from '../AddDiagnosisModal/FormField';
import { useStateValue } from '../state';
import { BaseEntry } from '../types';
import { DiagnosisSelection } from './FormField';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<BaseEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const isValidDate = (str: string) => {
  // STRING FORMAT yyyy-mm-dd
  if (str == '' || str == null) {
    return false;
  }

  // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
  var m: RegExpMatchArray | null = str.match(/(\d{4})-(\d{2})-(\d{2})/);

  // STR IS NOT FIT m IS NOT OBJECT
  if (m === null || typeof m !== 'object') {
    return false;
  }

  // CHECK m TYPE
  if (typeof m !== 'object' && m !== null) {
    return false;
  }

  var ret = true; //RETURN VALUE

  // YEAR CHECK
  if (m[1].length < 4) {
    ret = false;
  }
  // MONTH CHECK
  if (m[2].length < 2) {
    ret = false;
  }
  // DAY CHECK
  if (m[3].length < 2) {
    ret = false;
  }

  return ret;
};

export const AddDiagnosisForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  console.log('diagnosis :>> ', diagnosis);

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'Hospital',
        discharge: {
          date: '',
          criteria: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const formattedError = 'Field should be formatted as yyyy-mm-dd';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)) {
          errors.date = formattedError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <ErrorMessage name="description" />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <ErrorMessage name="date" />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <ErrorMessage name="specialist" />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />

            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <ErrorMessage name="criteria" />
            <Field
              label="Date"
              placeholder="Date"
              name="discharge.date"
              component={TextField}
            />
            <ErrorMessage name="discharge.date" />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiagnosisForm;
