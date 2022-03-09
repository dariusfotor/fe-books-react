import { Book } from '../../store/books/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import FormToDialog from './form'
import { useMutation } from 'react-query'
import FlashMessage from '../reuseable/flashMessage'

interface Props {
  openDialog: (action: boolean) => void
  open: boolean
  mode: 'create' | 'edit'
  book2Edit?: Book
}

const AddEditBookDialog = (props: Props) => {
  const mutation = useMutation((book: Book) => {
    return axios.post('/books/createbook', book)
  })

  const handleClose = () => {
    props.openDialog(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{ sx: { width: '50%', height: '100%' } }}
      >
        <DialogTitle>
          {props.mode === 'create'
            ? 'Pridėti knygą'
            : // eslint-disable-next-line no-useless-concat
              'Redaguoti' + ' ' + props.book2Edit?.name}

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
          <FormToDialog
            mode={props.mode}
            book2Edit={props.book2Edit}
            addEditBook={mutation.mutate}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddEditBookDialog
