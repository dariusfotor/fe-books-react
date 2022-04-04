import React from 'react';
import styled from 'styled-components';
import CardComp from './card';
import { Book } from '../../models/books/types';
import Button from '@mui/material/Button';
import AddEditBookDialog from '../reuseable-components/modal-add-edit';
import { BooksContext } from '../booksContext';

const BooksPage: React.FC<{}> = () => {
  const { books } = React.useContext(BooksContext);

  const [open, setOpen] = React.useState(false);

  const openDialog = (action: boolean) => {
    setOpen(action);
  };

  return (
    <Container>
      <h3 className="title">Knygų sąrašas</h3>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => openDialog(true)}
        >
          +
        </Button>
      </div>
      {books.map((book: Book) => {
        return (
          <div className="card" key={book.id}>
            <CardComp data={book} />
          </div>
        );
      })}

      <AddEditBookDialog openDialog={openDialog} open={open} mode={'create'} />
    </Container>
  );
};

export default BooksPage;

const Container = styled.div`
  .title {
    text-align: center;
  }
  .card {
    margin: 10px 0;
  }
`;
