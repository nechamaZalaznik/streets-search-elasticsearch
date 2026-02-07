import { elasticClient } from '../lib/elasticsearch.js';

const INDEX_NAME = 'beersheba_streets';

// Partial match search using wildcards (Note: lower performance on large datasets)
export const freeSearchInElastic = async (q: string): Promise<any> => {
    return await elasticClient.search({
        index: INDEX_NAME,
        query: {
            bool: {
                must: [{ wildcard: { street_name: { value: `*${q}*` } } }],
                filter: [{ term: { is_active: true } }] // Only active records
            }
        }
    });
};

// Full word matches across all fields using 'and' operator for precision
export const fullWordsSearchInElastic = async (q: string): Promise<any> => {
    return await elasticClient.search({
        index: INDEX_NAME,
        query: {
            bool: {
                must: [{ multi_match: { query: q, fields: ['*'], operator: 'and' } }],
                filter: [{ term: { is_active: true } }]
            }
        }
    });
};

// Exact phrase search on keyword fields and IDs
export const phraseSearchInElastic = async (q: string): Promise<any> => {
    return await elasticClient.search({
        index: INDEX_NAME,
        query: {
            bool: {
                must: [
                    {
                        multi_match: {
                            query: q,
                            fields: ['*.keyword', 'ID*'],
                            type: 'phrase'
                        }
                    }
                ],
                filter: [{ term: { is_active: true } }]
            }
        }
    });
};