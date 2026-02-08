import React from 'react';
import { toast } from 'react-toastify';
import { UI_MESSAGES } from '../../constants/messages';
import { useSearch } from '../../context/SearchContext';
import { searchStreets } from '../../services/api';
import styles from './SearchButton.module.scss';

const SearchButton: React.FC = () => {
  const { searchQuery, searchMode, setResults, setIsInitialState, isLoading, setIsLoading } = useSearch();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsInitialState(false);
    try {
      const data = await searchStreets(searchQuery, searchMode);
      setResults(data);
    } catch (error) {
      toast.error(UI_MESSAGES.ERRORS.SERVER_CONNECTION);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = searchQuery.trim() === '' || isLoading;

  return (
    <button
      onClick={handleSearch}
      disabled={isDisabled}
      className={`${styles.searchButton} ${isDisabled ? styles.disabled : ''}`}
    >
      {isLoading ? UI_MESSAGES.SEARCH.LOADING : UI_MESSAGES.SEARCH.IDLE}
    </button>
  );
};

export default SearchButton;