import React from 'react';
import { useSearch } from '../context/SearchContext';
import { MOCK_STREETS } from '../mocks/streetsMock';


const SearchButton: React.FC = () => {
  const { searchQuery, setSearchQuery, searchMode, setResults } = useSearch();

  const handleSearch = async () => {
    console.log(`מבצע חיפוש עבור: "${searchQuery}" בסוג חיפוש: ${searchMode}`);
    setResults(MOCK_STREETS);
    setSearchQuery('');
  };

  return (
    <button
      onClick={handleSearch}
      disabled={searchQuery.trim() === ''}
      style={{
        padding: '10px 20px',
        backgroundColor: searchQuery.trim() === '' ? '#ccc' : '#007bff', 
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: searchQuery.trim() === '' ? 'not-allowed' : 'pointer',
        fontSize: '16px'
      }}
    >
      חיפוש
    </button>
  );
};

export default SearchButton;