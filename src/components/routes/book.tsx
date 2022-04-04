import React from 'react';

import styled from 'styled-components';
import BookPage from '../book';

export const BookPageRoute: React.FC<{}> = () => {
  return (
    <Container>
      <BookPage />
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  margin: auto;
  padding: 40px;
`;
