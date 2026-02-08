import React from 'react';
import { SEARCH_OPTIONS } from '../../constants/searchOptions';
import { useSearch } from '../../context/SearchContext';
import styles from './SearchFilters.module.scss';

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
            onChange={() => setSearchMode(option.id)}
          />
          <span className={styles.labelText}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default SearchFilters;