import Typography from '@mui/material/Typography'
import { useCountrySearch } from './hooks/useCountrySearch'
import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'

function App() {
  const { searchValue, setSearchValue, filterMode, setFilterMode } =
    useCountrySearch()

  return (
    <div className="background-overlay">
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        Countries Explorer — a simple way to search, filter and learn about
        countries, their capitals, currencies and more.
      </Typography>
      <SearchBar
        value={searchValue}
        setValue={setSearchValue}
        mode={filterMode}
        setMode={setFilterMode}
      />
      <CountriesSection filter={searchValue} mode={filterMode} />
    </div>
  )
}

export default App
