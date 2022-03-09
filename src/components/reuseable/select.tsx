import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  data2Select: any[]
  onSelectChange: (e: SelectChangeEvent<number>) => void
  selectedValue?: number
  multiSelect?: boolean
  title: string
}

const SelectComponent = (props: Props) => {
  const showMenuItems = props.data2Select.map((data) => {
    return (
      <MenuItem key={data.value} value={data.value}>
        {data.name}
      </MenuItem>
    )
  })
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.selectedValue}
          label="Age"
          onChange={props.onSelectChange}
          name="genres"
        >
          {showMenuItems}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectComponent
