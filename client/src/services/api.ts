import axios from 'axios';
import { SearchMode, type SearchModeType } from '../types/SearchType';
import type { Street } from '../types/street';

const API_BASE_URL = 'http://localhost:3001/api';

const MODE_TO_ROUTE: Record<SearchModeType, string> = {
  [SearchMode.FREE]: 'search/free',
  [SearchMode.EXACT]: 'search/words',
  [SearchMode.PHRASE]: 'search/phrase'
};

export const searchStreets = async (query: string, mode: SearchModeType): Promise<Street[]> => {
  const endpoint = MODE_TO_ROUTE[mode];

  const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
    params: { q: query }
  });
  
  return response.data;
};

export const deleteStreet = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/streets/${id}`);
};