import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { SearchMode } from '../types';
import type { Street } from '../types/street';

/**
 * Defines the shape of the search state shared across the application.
 */
interface SearchContextType {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: Street[];                 
  setResults: (results: Street[]) => void; 
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

/**
 * Global provider that wraps the app to provide search-related state.
 * Manages the current search strategy, input value, and the data fetched from the API.
 */
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('FREE');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Street[]>([]);

  return (
    <SearchContext.Provider value={{ 
        searchMode, 
        setSearchMode, 
        searchQuery, 
        setSearchQuery,
        results,      
        setResults    
    }}>
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Custom hook for accessing search context.
 * Includes a safety check to ensure it's used within a SearchProvider.
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};