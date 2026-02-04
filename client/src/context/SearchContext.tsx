import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { SearchMode } from '../types';
import type { Street } from '../types/street';


interface SearchContextType {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: Street[];                
  setResults: (results: Street[]) => void; 
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

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

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};