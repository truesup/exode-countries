import { TextField, IconButton, Paper, Stack, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import { useRef, useEffect, useState } from 'react'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [mode, setMode] = useState<'name' | 'code' | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode])

  const renderModeButtons = () => (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ width: '100%' }}>
      {['name', 'code'].map(type => (
        <Button
          key={type}
          variant="outlined"
          onClick={() => setMode(type as 'name' | 'code')}
          sx={{
            flex: 1,
            color: 'white',
            borderColor: 'white',
            py: 1,
          }}>
          Search by country {type}
        </Button>
      ))}
    </Stack>
  )

  const renderSearchForm = () => (
    <Paper
      elevation={0}
      component="form"
      onSubmit={e => {
        e.preventDefault()
        console.log('submitted')
      }}
      sx={{
        width: '100%',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}>
      <IconButton onClick={() => setMode(null)} sx={{ color: 'white' }}>
        <ArrowBackIcon />
      </IconButton>

      <TextField
        inputRef={inputRef}
        variant="standard"
        placeholder={`Enter country ${mode}`}
        autoComplete="off"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        fullWidth
        InputProps={{
          disableUnderline: true,
          sx: { color: 'white' },
        }}
        sx={{ mx: 2, flex: 1 }}
      />
      <IconButton type="submit" sx={{ color: 'white' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )

  return (
    <Paper
      component="div"
      elevation={3}
      sx={{
        width: '100%',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: 'rgba(20, 28, 48, 0.95)',
      }}>
      {!mode ? renderModeButtons() : renderSearchForm()}
    </Paper>
  )
}

export default SearchBar
