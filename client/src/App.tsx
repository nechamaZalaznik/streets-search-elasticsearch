import './App.css'
import ResultsTable from './components/ResultsTable'
import SearchBar from './components/SearchBar'
import SearchButton from './components/SearchButton'
import SearchFilters from './components/SearchFilters'
import { SearchProvider } from './context/SearchContext'

function App() {

  return (
    <SearchProvider>
      <div>
      <SearchBar />
      <SearchFilters />
      <SearchButton /></div>
      <ResultsTable/>

    </SearchProvider>
  )
}

export default App
