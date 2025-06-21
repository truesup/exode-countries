import CountriesSection from './components/CountriesSection'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="background-overlay">
      <SearchBar />
      <CountriesSection />
    </div>
  )
}

export default App
