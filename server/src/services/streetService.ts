import { elasticClient } from '../lib/elasticsearch.js';


/**
 * מעדכן רחוב למצב לא פעיל (מחיקה לוגית)
 */
export const deleteStreetInElastic = async (id: string): Promise<any> => {
  return await elasticClient.update({
    index: 'beersheba_streets',
    id: id,
    doc: {
      is_active: false
    }
  });
};