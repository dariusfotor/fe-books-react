import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import UserMenu from './menu';
import { AuthContext } from '../auth/authService';
import { ROUTES } from '../routes';

const Header: React.FC<{}> = () => {
  const { token } = useContext(AuthContext);
  return (
    <Container>
      {!token ? (
        <>
          <NavLink
            to={ROUTES.LoginPage}
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Prisijungti
          </NavLink>
          <NavLink
            to={ROUTES.RegisterPage}
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Registruotis
          </NavLink>
        </>
      ) : (
        <UserMenu />
      )}
    </Container>
  );
};
export default Header;
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  width: 100%;
  height: 80px;
  background-color: #40495a;
  .active {
    margin-right: 20px;
    text-decoration: none;
    border: 1px solid white;
    padding: 18px;
    border-radius: 10px;
    color: white;
  }
  .inactive {
    margin-right: 20px;
    text-decoration: none;
    color: white;
  }
  .inactive:hover {
    color: #797474;
    transition: 0.3s;
    transform: translateY(-2px);
  }
`;
