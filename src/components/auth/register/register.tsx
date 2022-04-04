import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { User } from '../../../models/users/types';

const Register: React.FC<{}> = () => {
  let navigate = useNavigate();

  const mutation = useMutation(
    (user: User) => {
      return axios.post('/auth/register', user);
    },
    {
      onSuccess: () => {
        navigate('/login');
      },
      onError: () => {
        alert(mutation.error);
      },
    }
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Privalomas laukas'),
    email: Yup.string().email('Invalid email').required('Privalomas laukas'),
    password: Yup.string().required('Privalomas laukas'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Container>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Vartotojo vardas"
          sx={{ marginTop: 2 }}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Vardas Pavarde"
          sx={{ marginTop: 2 }}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          sx={{ marginTop: 2 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Slaptazodis"
          type="password"
          sx={{ marginTop: 2 }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          id="passwordConfirm"
          name="passwordConfirm"
          label="Pakartoti slaptazodi"
          type="password"
          sx={{ marginTop: 2 }}
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
        <div className="forgot-password">
          <a href="#">Forgot password</a>
        </div>
      </form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .form {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .forgot-password {
    text-align: center;
    font-size: 12px;
    margin-top: 15px;
  }
`;
