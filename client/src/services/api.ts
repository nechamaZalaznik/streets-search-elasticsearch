import axios from 'axios';
import type { SearchMode } from '../types';
import type { Street } from '../types/street';


const API_BASE_URL = 'http://localhost:3001/api';

export const searchStreets = async (query: string, mode: SearchMode): Promise<Street[]> => {
  // מיפוי בין ה-Mode של הריאקט ל-Route של הבקנד
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

export const deleteStreet = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/streets/${id}`);
};