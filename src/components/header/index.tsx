import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import UserMenu from './menu'

const Header: React.FC<{}> = () => {
  return (
    <Container>
      {!localStorage.getItem('token') ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Prisijungti
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            Registruotis
          </NavLink>
        </>
      ) : (
        <UserMenu />
      )}
    </Container>
  )
}
export default Header
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
`
