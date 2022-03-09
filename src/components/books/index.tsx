import { useQuery } from 'react-query'
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import CardComp from './card'
import { Book } from '../../store/books/types'
import Button from '@mui/material/Button'
import AddEditBookDialog from './addEditDialog'
import Alert from '@mui/material/Alert'

const BooksPage: React.FC<{}> = () => {
  const getBooks = async () => {
    const { data } = await axios.get('/books')
    return data
  }

  const [open, setOpen] = React.useState(false)

  const openDialog = (action: boolean) => {
    setOpen(action)
  }
  const { isLoading, isError, data } = useQuery('books', getBooks)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </div>
    )
  }

  return (
    <Container>
      <h3 className="title">Books List</h3>
      <div>
        <Button
          variant="contained"
          color="success"
          onClick={() => openDialog(true)}
        >
          +
        </Button>
      </div>
      {data.data.map((book: Book) => {
        return (
          <div className="card" key={book.id}>
            <CardComp data={book} />
          </div>
        )
      })}

      <AddEditBookDialog openDialog={openDialog} open={open} mode={'create'} />
    </Container>
  )
}

export default BooksPage

const Container = styled.div`
  .title {
    text-align: center;
  }
  .card {
    margin: 10px 0;
  }
`
