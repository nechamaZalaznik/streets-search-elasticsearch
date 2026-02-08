import React from 'react';
import styles from './SearchBar.module.scss';
import { useSearch } from '../../context/SearchContext';
import { SEARCH_OPTIONS } from '../../constants/searchOptions';
import { UI_MESSAGES } from '../../constants/messages';

const SearchBar: React.FC = () => {
  const { searchMode, searchQuery, setSearchQuery } = useSearch();
  
  const currentOption = SEARCH_OPTIONS.find(option => option.id === searchMode);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={currentOption?.placeholder || UI_MESSAGES.SEARCH.PLACEHOLDER_DEFAULT}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;