import Typography from '@mui/material/Typography'
import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="background-overlay">
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        Countries Explorer — a simple way to search, filter and learn about
        countries, their capitals, currencies and more.
      </Typography>
      <SearchBar />
      <CountriesSection />
    </div>
  )
}

export default App
