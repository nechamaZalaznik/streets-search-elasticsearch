import React from 'react';
import { SEARCH_OPTIONS, type SearchMode } from '../types';
import { useSearch } from '../context/SearchContext';


const SearchFilters: React.FC = () => {
    const { searchMode, setSearchMode } = useSearch();

    return (
        <div>
            {SEARCH_OPTIONS.map((option) => (
                <label key={option.id} style={{ display: 'block' }}>
                    <input
                        type="radio"
                        name="searchMode"
                        value={option.id}
                        // בדיקה האם האופציה הזו היא זו שנבחרה ב-State הגלובלי
                        checked={searchMode === option.id}
                        // עדכון ה-State הגלובלי ברגע הלחיצה
                        onChange={() => setSearchMode(option.id as SearchMode)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default SearchFilters;