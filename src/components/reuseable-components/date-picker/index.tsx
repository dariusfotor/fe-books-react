import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label?: string;
  value: string;
  setfield: any;
  style?: {};
}

const DatePickerFormik = (props: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        onChange={(newValue) => {
          if (newValue) {
            props.setfield(props.name, format(+newValue, 'yyyy-MM-dd'));
          }
        }}
        renderInput={(params) => (
          <TextField
            style={props.style ? props.style : { width: '230px' }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePickerFormik;
