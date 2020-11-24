import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, GenderOption } from './FormField';
import { Gender, Patient, Diagnosis } from '../types';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type DiagnosisFormValues = Diagnosis;

interface Props {
  onSubmit: (values: DiagnosisFormValues) => void;
  onCancel: () => void;
}

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        code: '',
        name: '',
        latin: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.code) {
          errors.code = requiredError;
        }
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.latin) {
          errors.latin = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Code"
              placeholder="Code"
              name="code"
              component={TextField}
            />
            <Field
              label="Latin"
              placeholder="Latin"
              name="latin"
              component={TextField}
            />

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
