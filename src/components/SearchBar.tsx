import {
  TextField,
  IconButton,
  Paper,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import { useRef, useEffect, useState } from 'react'

interface SearchBarProps {
  searchMode: 'name' | 'code' | null
  setSearchMode: any
  onSearch: (options: { variables: any }) => void
  searchByNameLoading: boolean
  setHasSearchBeenSubmitted: any
}

const SearchBar = ({
  searchMode,
  setSearchMode,
  onSearch,
  searchByNameLoading,
  setHasSearchBeenSubmitted,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchMode])

  const handleExitSearch = () => {
    setSearchMode(null)
    setHasSearchBeenSubmitted(false)
    setSearchValue('')
  }

  const normalizeToTitleCase = (input: string) => {
    return input
      .trim()
      .split(/\s+/)
      .map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setHasSearchBeenSubmitted(true)

    const trimmed = searchValue.trim()
    if (!trimmed || searchMode !== 'name') return

    const normalized = normalizeToTitleCase(trimmed)

    onSearch({
      variables: {
        name: { regex: `.*${normalized}.*` },
      },
    })
  }

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
          onClick={() => setSearchMode(type as 'name' | 'code')}
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
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}>
      <IconButton onClick={handleExitSearch} sx={{ color: 'white' }}>
        <ArrowBackIcon />
      </IconButton>

      <TextField
        inputRef={inputRef}
        variant="standard"
        placeholder={`Enter country ${searchMode} and press Enter`}
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
      {searchByNameLoading ? (
        <CircularProgress size={24} sx={{ color: 'white' }} />
      ) : (
        <IconButton type="submit" sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
      )}
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
      {!searchMode ? renderModeButtons() : renderSearchForm()}
    </Paper>
  )
}

export default SearchBar
