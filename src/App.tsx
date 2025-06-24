import Typography from '@mui/material/Typography'
import CountriesSection from './components/CountriesSection'
import { useLazyQuery } from '@apollo/client'
import { GET_COUNTRIES_BY_NAME } from './graphql/queries'
import SearchBar from './components/SearchBar'

function App() {
  const [
    getCountriesByName,
    {
      data: searchByNameData,
      loading: searchByNameLoading,
      error: searchByNameError,
    },
  ] = useLazyQuery(GET_COUNTRIES_BY_NAME)

  return (
    <div className="background-overlay">
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        Countries Explorer — a simple way to search, filter and learn about
        countries, their capitals, currencies and more.
      </Typography>
      <SearchBar
        onSearch={getCountriesByName}
        searchByNameLoading={searchByNameLoading}
      />
      <CountriesSection
        searchByNameData={searchByNameData}
        searchByNameLoading={searchByNameLoading}
        searchByNameError={searchByNameError}
      />
    </div>
  )
}

export default App
