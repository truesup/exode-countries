import Typography from '@mui/material/Typography'
import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'
import { useLazyQuery } from '@apollo/client'
import { useMemo, useState } from 'react'
import { GET_COUNTRIES_BY_CODE, GET_COUNTRIES_BY_NAME } from './graphql/queries'
import type { SearchMode } from './types/search'

function App() {
  const [searchMode, setSearchMode] = useState<SearchMode>(null)
  const [hasSearchBeenSubmitted, setHasSearchBeenSubmitted] = useState(false)

  // useLazyQuery для запроса по требованию, а не при монтировании
  const [getCountriesByName, queryByName] = useLazyQuery(GET_COUNTRIES_BY_NAME)
  const [getCountriesByCode, queryByCode] = useLazyQuery(GET_COUNTRIES_BY_CODE)

  // триггер - для запуска, резулт - содержит дату, лоадинг, еррор
  const queries = {
    name: { trigger: getCountriesByName, result: queryByName },
    code: { trigger: getCountriesByCode, result: queryByCode },
  }

  const currentQuery = useMemo(() => {
    return searchMode ? queries[searchMode] : null
  }, [searchMode, queries])

  return (
    <div className="background-overlay">
      <Typography component="h1" variant="h1" sx={{ display: 'none' }}>
        Countries Explorer — a simple way to search, filter and learn about
        countries, their capitals, currencies and more.
      </Typography>

      <SearchBar
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onSearch={currentQuery?.trigger ?? (() => {})} // заглушка чтобы не вылетала ошибка
        searchLoading={currentQuery?.result.loading ?? false}
        setHasSearchBeenSubmitted={setHasSearchBeenSubmitted}
      />

      <CountriesSection
        searchMode={searchMode}
        hasSearchBeenSubmitted={hasSearchBeenSubmitted}
        searchData={currentQuery?.result.data ?? null}
        searchLoading={currentQuery?.result.loading ?? false}
        searchError={currentQuery?.result.error ?? null}
      />
    </div>
  )
}

export default App
