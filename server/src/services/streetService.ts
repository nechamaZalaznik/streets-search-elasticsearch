import { elasticClient } from '../lib/elasticsearch.js';

/**
 * Updates the document's 'is_active' field to false.
 * Using the Update API instead of Delete to maintain data history.
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