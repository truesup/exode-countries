import { TextField, IconButton, Paper, Stack, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRef, useEffect } from 'react'

interface Props {
  value: string
  setValue: (val: string) => void
  mode: 'name' | 'code' | null
  setMode: (val: 'name' | 'code' | null) => void
}

const SearchBar = ({ value, setValue, mode, setMode }: Props) => {
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

  const renderSearchInput = () => (
    <>
      <IconButton onClick={() => setMode(null)} sx={{ color: 'white' }}>
        <ArrowBackIcon />
      </IconButton>
      <TextField
        inputRef={inputRef}
        variant="standard"
        placeholder={`Enter country ${mode}`}
        autoComplete="off"
        value={value}
        onChange={e => setValue(e.target.value)}
        InputProps={{
          disableUnderline: true,
          sx: { color: 'white' },
        }}
        sx={{ ml: 2, flex: 1 }}
      />
    </>
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
      {!mode ? renderModeButtons() : renderSearchInput()}
    </Paper>
  )
}

export default SearchBar
