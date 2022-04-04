import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Book, BookStatus } from '../../models/books/types';
import { generatePath } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useNavigate } from 'react-router';

interface Props {
  data: Book;
}

const CardComp = (props: Props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    const url = generatePath(ROUTES.BookPage, {
      id: props.data.id ? props.data.id.toString() : '',
    });
    navigate(url);
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={
            props.data.isReading === BookStatus.Reading
              ? { color: 'green' }
              : props.data.isReading === BookStatus.Done
              ? { color: 'orange' }
              : { color: 'grey' }
          }
          variant="body2"
          color="text.secondary"
        >
          {props.data.isReading === BookStatus.NotReading
            ? 'Neskaitoma'
            : props.data.isReading === BookStatus.Reading
            ? 'Skaitoma'
            : props.data.isReading === BookStatus.Done
            ? 'Pabaigta skaityti'
            : ''}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.genres}
        </Typography>
        <Typography variant="body2">foto</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={routeChange}>
          Peržiūrėti
        </Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default CardComp;
