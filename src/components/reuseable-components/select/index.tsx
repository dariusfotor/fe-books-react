import { useField } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  data: { label: string; value: string | number }[];
}

const SelectField = (props: Props) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      size="small"
      style={{ width: '230px' }}
      label={props.label}
      select
      error={Boolean(meta.error && meta.touched)}
      helperText={meta.error && meta.touched ? meta.error : ''}
      {...field}
    >
      {props.data.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
