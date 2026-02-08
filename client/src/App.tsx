import React from 'react';
import Streets from './components/Streets/Streets';
import SearchBar from './components/SearchBar/SearchBar';
import SearchButton from './components/SearchButton/SearchButton';
import SearchFilters from './components/SearchFilters/SearchFilters';
import { SearchProvider } from './context/SearchContext';
import styles from './App.module.scss';
import { ToastContainer } from 'react-toastify';
import { UI_MESSAGES } from './constants/messages';

function App() {
  return (
    <SearchProvider>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <h1>{UI_MESSAGES.TITLES.MAIN_SYSTEM}</h1>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.searchSection}>
            <div className={styles.searchControls}>
              <SearchBar />
              <SearchFilters />
              <SearchButton />
            </div>
          </section>

          <section className={styles.resultsSection}>
            <Streets />
          </section>
        </main>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </SearchProvider>
  );
}

export default App;