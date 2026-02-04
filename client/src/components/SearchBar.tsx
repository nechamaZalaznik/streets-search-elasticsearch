import React from 'react';
import { SEARCH_OPTIONS } from '../types';
import { useSearch } from '../context/SearchContext';

const SearchBar: React.FC = () => {
  // שליפת הערך (searchQuery) והפונקציה לעדכון (setSearchQuery) מה-Context
  const { searchMode, searchQuery, setSearchQuery } = useSearch();

  // מציאת האופציה הנוכחית כדי להציג את ה-Placeholder המתאים
  const currentOption = SEARCH_OPTIONS.find(option => option.id === searchMode);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        // 1. ה-Placeholder משתנה לפי ה-searchMode הגלובלי
        placeholder={currentOption?.placeholder || 'הקלד שם רחוב לחיפוש...'}
        
        // 2. הערך של ה-Input תמיד מסונכרן עם המשתנה הגלובלי
        value={searchQuery}
        
        // 3. בכל שינוי (הקלדה), אנחנו מעדכנים את המשתנה הגלובלי
        onChange={(e) => setSearchQuery(e.target.value)}
        
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
    </div>
  );
};

export default SearchBar;