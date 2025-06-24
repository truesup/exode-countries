import Typography from '@mui/material/Typography'
import CountriesSection from './components/CountriesSection'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_COUNTRIES_BY_CODE, GET_COUNTRIES_BY_NAME } from './graphql/queries'
import SearchBar from './components/SearchBar'

function App() {
  const [searchMode, setSearchMode] = useState<'name' | 'code' | null>(null)
  const [hasSearchBeenSubmitted, setHasSearchBeenSubmitted] =
    useState<boolean>(false)

  const [
    getCountriesByName,
    {
      data: searchByNameData,
      loading: searchByNameLoading,
      error: searchByNameError,
    },
  ] = useLazyQuery(GET_COUNTRIES_BY_NAME)

  const [
    getCountriesByCode,
    {
      data: searchByCodeData,
      loading: searchByCodeLoading,
      error: searchByCodeError,
    },
  ] = useLazyQuery(GET_COUNTRIES_BY_CODE)

  const searchResult =
    searchMode === 'name'
      ? {
          data: searchByNameData,
          loading: searchByNameLoading,
          error: searchByNameError,
        }
      : searchMode === 'code'
      ? {
          data: searchByCodeData,
          loading: searchByCodeLoading,
          error: searchByCodeError,
        }
      : {
          data: null,
          loading: false,
          error: null,
        }

  return (
    <div className="background-overlay">
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        Countries Explorer — a simple way to search, filter and learn about
        countries, their capitals, currencies and more.
      </Typography>
      <SearchBar
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onSearch={
          searchMode === 'name' ? getCountriesByName : getCountriesByCode
        }
        searchLoading={searchResult.loading}
        setHasSearchBeenSubmitted={setHasSearchBeenSubmitted}
      />

      <CountriesSection
        searchMode={searchMode}
        hasSearchBeenSubmitted={hasSearchBeenSubmitted}
        searchData={searchResult.data}
        searchLoading={searchResult.loading}
        searchError={searchResult.error}
      />
    </div>
  )
}

export default App
