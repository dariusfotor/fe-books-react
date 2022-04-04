import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { AuthContext } from '../authService';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes';

const Login: React.FC<{}> = () => {
  let navigate = useNavigate();
  const { loginMutation } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Privalomas laukas'),
    password: Yup.string().required('Privalomas laukas'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
      navigate(ROUTES.BooksPage);
    },
  });

  return (
    <Container>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          sx={{ marginTop: 2 }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="success"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;

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
`;
