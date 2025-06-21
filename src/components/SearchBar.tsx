import { useState, FormEvent } from 'react'
import { TextField, IconButton, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  value: string
  setValue: (val: string) => void
}

const SearchBar = ({ value, setValue }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValue('')
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        width: '100%',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: 'rgba(20, 28, 48, 0.95)',
      }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Enter country name or code..."
        autoComplete="off"
        value={value}
        onChange={e => setValue(e.target.value)}
        InputProps={{ disableUnderline: true, sx: { color: 'white' } }}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton type="submit" sx={{ color: 'white' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
