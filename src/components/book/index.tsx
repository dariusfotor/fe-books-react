import { useContext, useEffect, useState } from 'react';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { BooksContext } from '../booksContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import AddEditBookDialog from '../reuseable-components/modal-add-edit';
import ModalConfirm from '../reuseable-components/modal-confirm';
import { useNavigate } from 'react-router';
import { ROUTES } from '../routes';
import { BookStatus } from '../../models/books/types';

const BookPage = () => {
  const navigate = useNavigate();
  const { book, deleteBook, getBookById } = useContext(BooksContext);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openDialog = (action: boolean) => {
    setOpen(action);
  };

  const deleteB = async (id: number) => {
    await deleteBook(id);
    navigate(ROUTES.BooksPage);
  };

  const getDaysBetweenDates = (dateOne: string, dateTwo: string) => {
    const start = new Date(dateOne).valueOf();
    const end = new Date(dateTwo).valueOf();
    const differenceInMs = end - start;
    return Math.floor(differenceInMs / (24 * 60 * 60 * 1000));
  };

  useEffect(() => {
    getBookById(params.id ? +params.id : 0);
  }, []);
  return book ? (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          padding: 3,
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          variant="h4"
          component="h4"
        >
          <TitleStyled>
            {book?.isReading === BookStatus.Reading ? (
              <CircleActiveStyled></CircleActiveStyled>
            ) : book?.isReading === BookStatus.Done ? (
              <CircleDoneStyled></CircleDoneStyled>
            ) : (
              <CircleNotActiveStyled></CircleNotActiveStyled>
            )}
            {book?.name}
          </TitleStyled>
          <div>
            <Button onClick={() => openDialog(true)}>
              <EditIcon />
            </Button>
            <Button onClick={() => setOpenDeleteModal(true)}>
              <DeleteIcon />
            </Button>
          </div>
        </Typography>
        <Typography mt={3} component="h6">
          <div>
            {book?.firstEdition ? `Pirmas leidimas ${book.firstEdition}` : ''}
          </div>
          <div>{book?.genres ? `Žanras ${book.genres}` : ''}</div>
          <ReadDateStyled>
            <div>
              {book?.startReadDate && book?.endReadDate
                ? `Pradėta skaityti ${book.startReadDate}, pabaigta ${book.endReadDate} `
                : book?.startReadDate
                ? `Pradėta skaityti ${book.startReadDate}`
                : ''}
            </div>
            <div>
              {book?.startReadDate && book?.endReadDate
                ? getDaysBetweenDates(book?.startReadDate, book?.endReadDate) +
                  ' dienos'
                : null}
            </div>
          </ReadDateStyled>
        </Typography>
        <Rating
          name="read-only"
          value={book?.evaluation ? book.evaluation : 0}
          readOnly
        />
      </Paper>
      <AddEditBookDialog
        open={open}
        mode="edit"
        book={book}
        openDialog={openDialog}
      />
      <ModalConfirm
        open={openDeleteModal}
        delete={() => deleteB(book?.id || 0)}
        handleClose={() => setOpenDeleteModal(false)}
        label={`Ar tikrai ištrinti ${book?.name}`}
      />
    </Box>
  ) : (
    <div>Įrašų nėra</div>
  );
};

export default BookPage;

const TitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ReadDateStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CircleActiveStyled = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: green;
  margin-right: 20px;
`;
const CircleNotActiveStyled = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: grey;
  margin-right: 20px;
`;

const CircleDoneStyled = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: orange;
  margin-right: 20px;
`;
