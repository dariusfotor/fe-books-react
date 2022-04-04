import React from 'react';
import styled from 'styled-components';
import Header from '../header';

const AppLayout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <Header />
      <Main>{children}</Main>
    </div>
  );
};

export default AppLayout;

const Main = styled.div`
  width: 100%;
  overflow-y: auto;
`;
