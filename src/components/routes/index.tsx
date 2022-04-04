import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from '../app-layout';
import { BookPageRoute } from './book';
import { BooksPageRoute } from './books';
import { HomePageRoute } from './homePage';
import { LoginRoute } from './login';
import { RegisterRoute } from './register';

export const ROUTES = {
  HomePage: `/`,
  LoginPage: `/login`,
  RegisterPage: `/register`,
  BooksPage: `/books`,
  BookPage: `/book/:id`,
};
const RoutesComp: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.HomePage} element={<HomePageRoute />} />
          <Route path={ROUTES.LoginPage} element={<LoginRoute />} />
          <Route path={ROUTES.RegisterPage} element={<RegisterRoute />} />
          <Route path={ROUTES.BooksPage} element={<BooksPageRoute />} />
          <Route path={ROUTES.BookPage} element={<BookPageRoute />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default RoutesComp;
