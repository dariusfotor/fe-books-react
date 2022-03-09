import React from 'react'
import {
    BrowserRouter as Router, 
    Routes,
    Route
  } from "react-router-dom";
import AppLayout from './components/app-layout';
import { BooksPageRoute } from './components/routes/books';
import { HomePageRoute } from './components/routes/homePage';
import { LoginRoute } from './components/routes/login';
import { RegisterRoute } from './components/routes/register';

const RoutesComp: React.FC = () => {

  const ROUTES = {
    HomePage: () => `/`,
    LoginPage: () => `/login`,
    RegisterPage: () => `/register`,
    BooksPage: () => '/books'
  }
  return (
    <Router>
      <AppLayout />
      <Routes>
        <Route path={ROUTES.HomePage()} element={<HomePageRoute />} />
        <Route path={ROUTES.LoginPage()} element={<LoginRoute />} />
        <Route path={ROUTES.RegisterPage()} element={<RegisterRoute />} />
        <Route path={ROUTES.BooksPage()} element={<BooksPageRoute />} />
      </Routes>
    </Router>
  )
}

export default RoutesComp
