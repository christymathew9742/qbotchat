import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const Display = () => {
  const handleSubmit = (values:any, { resetForm }:any) => {
    console.log('Form Data:', values);
    alert('Form submitted successfully!');
    resetForm(); // Optionally reset the form after submission
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Form with Validation
      </Typography>
      <Formik
        initialValues={{ name: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Pass handleSubmit as onSubmit
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );

};

export default Display;
