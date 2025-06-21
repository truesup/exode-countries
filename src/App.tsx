import { useState } from 'react'
import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="background-overlay">
      <SearchBar value={searchValue} setValue={setSearchValue} />
      <CountriesSection filter={searchValue} />
    </div>
  )
}

export default App
