import { useState } from 'react'
import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [filterMode, setFilterMode] = useState<'name' | 'code' | null>(null)

  return (
    <div className="background-overlay">
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
