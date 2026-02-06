import React from 'react';
import styles from './SearchBar.module.scss';
import { useSearch } from '../../context/SearchContext';
import { SEARCH_OPTIONS } from '../../types';

const SearchBar: React.FC = () => {
  const { searchMode, searchQuery, setSearchQuery } = useSearch();

  const currentOption = SEARCH_OPTIONS.find(option => option.id === searchMode);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={currentOption?.placeholder || 'הקלד לחיפוש...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;