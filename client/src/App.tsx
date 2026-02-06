import React from 'react';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBar from './components/SearchBar/SearchBar';
import SearchButton from './components/SearchButton/SearchButton';
import SearchFilters from './components/SearchFilters/SearchFilters';
import { SearchProvider } from './context/SearchContext';
import './App.css'; 
import styles from './App.module.scss';

function App() {
  return (
    <SearchProvider>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <h1>מערכת ניהול רחובות</h1>
        </header>

        <main className={styles.mainContent}>
          {/* אזור החיפוש המאוגד */}
          <section className={styles.searchSection}>
            <div className={styles.searchControls}>
              <SearchBar />
              <SearchFilters />
              <SearchButton />
            </div>
          </section>

          {/* אזור התוצאות */}
          <section className={styles.resultsSection}>
            <ResultsTable />
          </section>
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;