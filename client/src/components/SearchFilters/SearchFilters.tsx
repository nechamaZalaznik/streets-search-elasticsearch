import React from 'react';

import styles from './SearchFilters.module.scss';
import { SEARCH_OPTIONS, type SearchMode } from '../../types';
import { useSearch } from '../../context/SearchContext';

const SearchFilters: React.FC = () => {
  const { searchMode, setSearchMode } = useSearch();

  return (
    <div className={styles.filtersContainer}>
      {SEARCH_OPTIONS.map((option) => (
        <label key={option.id} className={styles.filterLabel}>
          <input
            type="radio"
            name="searchMode"
            className={styles.radioInput}
            value={option.id}
            checked={searchMode === option.id}
            onChange={() => setSearchMode(option.id as SearchMode)}
          />
          <span className={styles.labelText}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SearchFilters;