import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { searchStreets } from '../services/api';

const SearchButton: React.FC = () => {
  const { searchQuery, setSearchQuery, searchMode, setResults } = useSearch();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchStreets(searchQuery, searchMode);
      setResults(data);
      // הערה: בתרגילים בדרך כלל לא מנקים את ה-query מיד כדי שהמשתמש יראה מה הוא חיפש
    } catch (error) {
      alert("שגיאה בחיבור לשרת");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`search-button ${searchQuery.trim() === '' ? 'disabled' : ''}`}
      onClick={handleSearch}
      disabled={searchQuery.trim() === '' || loading}
    >
      {loading ? 'מחפש...' : 'חיפוש'}
    </button>
  );
};

export default SearchButton;