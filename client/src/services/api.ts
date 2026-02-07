import axios from 'axios';
import type { SearchMode } from '../types';
import type { Street } from '../types/street';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches street data from the backend based on the selected search strategy.
 * Maps search modes (FREE, EXACT, PHRASE) to their respective API endpoints.
 */
export const searchStreets = async (query: string, mode: SearchMode): Promise<Street[]> => {
  const modeToRoute = {
    'FREE': 'search/free',
    'EXACT': 'search/words',
    'PHRASE': 'search/phrase'
  };

  const response = await axios.get(`${API_BASE_URL}/${modeToRoute[mode]}`, {
    params: { q: query }
  });
  return response.data;
};

/**
 * Sends a request to mark a specific street record as inactive.
 */
export const deleteStreet = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/streets/${id}`);
};