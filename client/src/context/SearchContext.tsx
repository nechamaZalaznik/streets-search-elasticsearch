import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { SearchMode, type SearchModeType } from '../types/SearchType';
import type { Street } from '../types/street';


interface SearchContextType {
  searchMode: SearchModeType;
  setSearchMode: (mode: SearchModeType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: Street[];
  setResults: (results: Street[]) => void;
  isLoading: boolean; 
  setIsLoading: (loading: boolean) => void;
  isInitialState: boolean;
  setIsInitialState: (isInitial: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchMode, setSearchMode] = useState<SearchModeType>(SearchMode.FREE);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Street[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);

  return (
    <SearchContext.Provider value={{ 
        searchMode, 
        setSearchMode, 
        searchQuery, 
        setSearchQuery,
        results,      
        setResults,
        isLoading,
        setIsLoading,
        isInitialState,
        setIsInitialState
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