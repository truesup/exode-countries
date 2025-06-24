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
import { useRef, useEffect, useState, FormEvent } from 'react'
import type { SearchMode } from '../types/search'

interface SearchBarProps {
  searchMode: SearchMode
  setSearchMode: (mode: SearchMode) => void
  onSearch: (options: { variables: any }) => void
  searchLoading: boolean
  setHasSearchBeenSubmitted: (submitted: boolean) => void
}

const SearchBar = ({
  searchMode,
  setSearchMode,
  onSearch,
  searchLoading,
  setHasSearchBeenSubmitted,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // автофокус на инпут при выборе режима
  useEffect(() => {
    if (searchMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchMode])

  // выход из поиска по mode
  const handleExitSearch = () => {
    setSearchValue('')
    setSearchMode(null)
    setHasSearchBeenSubmitted(false)
  }

  // для адекватного поиска по названию страны
  const normalizeToTitleCase = (input: string): string =>
    input
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmed = searchValue.trim()
    if (!trimmed || !searchMode) return

    // чтобы не отображать старый результат поиска при ->
    // закрытии и переводе mode в null
    setHasSearchBeenSubmitted(true)

    const variable =
      searchMode === 'name'
        ? { name: { regex: `.*${normalizeToTitleCase(trimmed)}.*` } }
        : { code: { regex: `^${trimmed.toUpperCase()}$` } }

    onSearch({ variables: variable })
  }

  const renderModeButtons = () => (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ width: '100%' }}>
      {/* as const чтобы ts не ругался и знал точные значения */}
      {(['name', 'code'] as const).map(type => (
        <Button
          key={type}
          variant="outlined"
          onClick={() => setSearchMode(type)}
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
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
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

      <IconButton
        type="submit"
        sx={{ color: 'white' }}
        disabled={searchLoading}>
        {searchLoading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <SearchIcon />
        )}
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
      {!searchMode ? renderModeButtons() : renderSearchForm()}
    </Paper>
  )
}

export default SearchBar
