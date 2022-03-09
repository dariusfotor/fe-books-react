import React from 'react'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'

const FlashMessage = () => {
  const [open, setOpen] = React.useState(false)

  const handleToClose = () => {
    setOpen(false)
  }

  return (
    <div style={{}}>
      <h4>How to use SnackBar Component in ReactJS?</h4>
      <React.Fragment>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
        <IconButton
          aria-label="close"
          onClick={handleToClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    </div>
  )
}

export default FlashMessage
