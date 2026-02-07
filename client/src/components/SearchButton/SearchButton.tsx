import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import { searchStreets } from '../../services/api';
import styles from './SearchButton.module.scss';
import { toast } from 'react-toastify';

const SearchButton: React.FC = () => {
  const { searchQuery, searchMode, setResults } = useSearch();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const data = await searchStreets(searchQuery, searchMode);
      setResults(data);
    } catch (error) {
      toast.error("שגיאה בחיבור לשרת");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = searchQuery.trim() === '' || loading;

  return (
    <button
      onClick={handleSearch}
      disabled={isDisabled}
      className={`${styles.searchButton} ${isDisabled ? styles.disabled : ''}`}
    >
      {loading ? 'מחפש...' : 'חיפוש'}
    </button>
  );
};

export default SearchButton;