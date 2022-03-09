import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { Book } from '../../store/books/types'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import SelectComponent from '../reuseable/select'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import styled from 'styled-components'

interface Props {
  addEditBook: (book: Book) => void
  book2Edit?: Book
  mode: 'create' | 'edit'
}

const FormToDialog = (props: Props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Privalomas laukas'),
    author: Yup.string().required('Privalomas laukas'),
  })

  const formik = useFormik({
    initialValues:
      props.mode === 'create'
        ? {
            name: '',
            author: '',
            firstEdition: '',
            originalName: '',
            genres: 0,
            description: '',
            startReadDate: '',
            endReadDate: '',
            photo: '',
            evaluation: 0,
            numberOfPages: 0,
            publishHouse: '',
          }
        : {
            name: props.book2Edit?.name,
            author: props.book2Edit?.author,
            firstEdition: props.book2Edit?.firstEdition,
            originalName: props.book2Edit?.originalName,
            genres: props.book2Edit?.genres,
            description: props.book2Edit?.description,
            startReadDate: props.book2Edit?.startReadDate,
            endReadDate: props.book2Edit?.endReadDate,
            photo: props.book2Edit?.photo,
            evaluation: props.book2Edit?.evaluation,
            numberOfPages: props.book2Edit?.evaluation,
            publishHouse: props.book2Edit?.publishHouse,
          },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.addEditBook(values)
    },
  })
  return (
    <Container>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Pavadinimas"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="author"
          name="author"
          label="Autorius"
          value={formik.values.author}
          onChange={formik.handleChange}
          sx={{ marginTop: 2 }}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          fullWidth
          id="originalName"
          name="originalName"
          label="Originalus pavadinimas"
          value={formik.values.originalName}
          onChange={formik.handleChange}
          sx={{ marginTop: 2 }}
          error={
            formik.touched.originalName && Boolean(formik.errors.originalName)
          }
          helperText={formik.touched.originalName && formik.errors.originalName}
        />
        <TextField
          id="numberOfPages"
          name="numberOfPages"
          label="Puslapių skaičius"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value={formik.values.numberOfPages}
          onChange={formik.handleChange}
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          id="publishHouse"
          name="publishHouse"
          label="Leidykla"
          value={formik.values.publishHouse}
          onChange={formik.handleChange}
          sx={{ marginTop: 2 }}
          error={
            formik.touched.publishHouse && Boolean(formik.errors.publishHouse)
          }
          helperText={formik.touched.publishHouse && formik.errors.publishHouse}
        />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Aprašymas"
          style={{ marginTop: '20px', marginBottom: '20px' }}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <SelectComponent
          data2Select={[
            {
              name: 'Romanas',
              value: 1,
            },
            {
              name: 'Komedija',
              value: 2,
            },
          ]}
          onSelectChange={formik.handleChange}
          selectedValue={formik.values.genres}
          title={'Zanrai'}
        />
        <Button
          className="submit-btn"
          color="success"
          variant="contained"
          type="submit"
          style={{ marginTop: '20px' }}
        >
          Patvirtinti
        </Button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  .form {
    display: flex;
    flex-direction: column;
  }
`

export default FormToDialog
