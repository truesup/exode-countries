import { TextField, IconButton, Paper, Stack, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FormEvent, useRef, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  value: string
  setValue: (val: string) => void
  mode: 'name' | 'code' | null
  setMode: (val: 'name' | 'code' | null) => void
}

const SearchBar = ({ value, setValue, mode, setMode }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValue('')
  }

  useEffect(() => {
    if (mode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode])

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
      {!mode ? (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              color: 'white',
              borderColor: 'white',
              padding: '4px',
            }}
            onClick={() => setMode('name')}>
            Search by country name
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              color: 'white',
              borderColor: 'white',
              paddingBlock: '6px',
            }}
            onClick={() => setMode('code')}>
            Search by country code
          </Button>
        </Stack>
      ) : (
        <>
          <IconButton onClick={() => setMode(null)} sx={{ color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="standard"
            placeholder={`Enter country ${mode}`}
            autoComplete="off"
            value={value}
            onChange={e => setValue(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { color: 'white' } }}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ color: 'white' }}>
            <SearchIcon />
          </IconButton>
        </>
      )}
    </Paper>
  )
}

export default SearchBar
