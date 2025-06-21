import { useState, FormEvent } from 'react'
import { TextField, IconButton, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submitted:', inputValue)
    setInputValue('')
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#141C30',
      }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Enter country name or code..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
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
