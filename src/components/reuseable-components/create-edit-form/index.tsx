import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Book, BookStatus, CreateBook } from '../../../models/books/types';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import styled from 'styled-components';
import { AuthContext } from '../../auth/authService';
import InputFormik from '../input-formik';
import SelectField from '../select';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import DatePickerFormik from '../date-picker';
import { uploadImage } from '../../../server/controller';

interface Props {
  addEditBook: (book: any) => void;
  book?: Book;
  mode: 'create' | 'edit';
  handleClose: () => void;
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Įveskite pavadinimą'),
  author: Yup.string().required('Įveskite autorių'),
  numberOfPages: Yup.number().required('Įveskite psl. skaičių'),
});

const BookForm = (props: Props) => {
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const { user } = useContext(AuthContext);

  const initialValues: Omit<Book, 'id'> & { id?: number } =
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
          numberOfPages: '',
          publishHouse: '',
          isReading: 0,
          userId: user ? user.id : 0,
        }
      : {
          id: props.book?.id,
          name: props.book?.name || '',
          author: props.book?.author || '',
          firstEdition: props.book?.firstEdition || '',
          originalName: props.book?.originalName || '',
          genres: props.book?.genres || 0,
          description: props.book?.description || '',
          startReadDate: props.book?.startReadDate || '',
          endReadDate: props.book?.endReadDate || '',
          photo: props.book?.photo || '',
          evaluation: props.book?.evaluation || 0,
          numberOfPages: props.book?.numberOfPages || '',
          publishHouse: props.book?.publishHouse || '',
          isReading: props.book?.isReading || 0,
          userId: props.book?.userId || 0,
        };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        uploadImage(selectedPhoto);
        // props.addEditBook(values);
        // props.handleClose();
      }}
    >
      {({ values, setFieldValue }) => (
        <FormStyle>
          <RowStyle>
            <InputFormik
              id="name"
              name="name"
              label="Pavadinimas"
              type="text"
            />
            <InputFormik
              id="author"
              name="author"
              label="Autorius"
              type="text"
            />
          </RowStyle>
          <RowStyle>
            <InputFormik
              id="originalName"
              name="originalName"
              label="Originalus pavadinimas"
              type="text"
            />

            <InputFormik
              id="numberOfPages"
              name="numberOfPages"
              label="Puslapių skaičius"
              type="number"
            />
          </RowStyle>
          <RowStyle>
            <InputFormik
              id="publishHouse"
              name="publishHouse"
              label="Leidykla"
              type="text"
            />
            <SelectField
              data={[
                {
                  label: 'Romanas',
                  value: 1,
                },
                {
                  label: 'Komedija',
                  value: 2,
                },
              ]}
              label="Zanrai"
              name="genres"
            />
          </RowStyle>
          <RowStyle>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Aprašymas"
              onChange={(e) => setFieldValue('description', e.target.value)}
            />
            <Box width={230}>
              <FormLabel>Įvertinimas</FormLabel>
              <Slider
                size="small"
                value={values.evaluation}
                min={0}
                max={5}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(e, value) => setFieldValue('evaluation', value)}
              />
            </Box>
          </RowStyle>
          <RowStyle>
            <div>
              <DatePickerFormikStyled
                name="firstEdition"
                label="Pirmas leidimas"
                value={values.firstEdition}
                setfield={setFieldValue}
              />
              <InputFormik
                id="photo"
                name="photo"
                type="file"
                onChange={(e) => setSelectedPhoto(e.target.files[0])}
              />
            </div>
            <FormControl>
              <FormLabel>Knygos statusas</FormLabel>
              <RadioGroup
                name="isReading"
                value={values.isReading}
                onChange={(event) => {
                  setFieldValue('isReading', +event.target.value);
                }}
              >
                <FormControlLabel
                  value={BookStatus.NotReading}
                  control={<Radio />}
                  label="Neskaitoma"
                />
                <FormControlLabel
                  value={BookStatus.Reading}
                  control={<Radio />}
                  label="Skaitoma"
                />
                <FormControlLabel
                  value={BookStatus.Done}
                  control={<Radio />}
                  label="Pabaigta skaityti"
                />
              </RadioGroup>
            </FormControl>
          </RowStyle>
          <RowStyle>
            {values.isReading === BookStatus.Reading ||
            values.isReading === BookStatus.Done ? (
              <DatePickerFormikStyled
                name="startReadDate"
                label="Pradėta skaityti"
                value={values.startReadDate}
                setfield={setFieldValue}
              />
            ) : null}
            {values.isReading === BookStatus.Done ? (
              <DatePickerFormikStyled
                name="endReadDate"
                label="Baigta skaityti"
                value={values.endReadDate}
                setfield={setFieldValue}
              />
            ) : null}
          </RowStyle>

          <Button
            className="submit-btn"
            color="success"
            variant="contained"
            type="submit"
            style={{ marginTop: '20px' }}
          >
            {props.mode === 'create' ? 'Išsaugoti' : 'Redaguoti'}
          </Button>
        </FormStyle>
      )}
    </Formik>
  );
};

const FormStyle = styled(Form)`
  display: flex;
  flex-direction: column;
`;
const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const DatePickerFormikStyled = styled(DatePickerFormik)`
  width: 230px;
`;

export default BookForm;
