import { Book, CreateBook } from '../../../models/books/types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BookForm from '../create-edit-form';
import { useContext } from 'react';
import { BooksContext } from '../../booksContext';
interface Props {
  openDialog: (action: boolean) => void;
  open: boolean;
  mode: 'create' | 'edit';
  book?: Book;
}

const AddEditBookDialog = (props: Props) => {
  const { saveBook, updateBook } = useContext(BooksContext);
  const handleClose = () => {
    props.openDialog(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{ sx: { width: '530px' } }}
      >
        <DialogTitle>
          {props.mode === 'create' ? 'Pridėti knygą' : 'Redaguoti'}

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <BookForm
            mode={props.mode}
            book={props.book}
            addEditBook={props.mode === 'create' ? saveBook : updateBook}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEditBookDialog;
