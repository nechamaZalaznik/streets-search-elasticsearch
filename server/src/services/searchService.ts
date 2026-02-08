import type { estypes } from '@elastic/elasticsearch';
import { elasticClient } from '../clients/elasticsearch.js';
import { config } from '../config/index.js';
import type { Street } from '../types/street.js';

export class SearchService {
  private readonly INDEX_NAME = config.elastic.index;


  async freeSearchInElastic(searchText: string): Promise<estypes.SearchResponse<Street>> {
    return await elasticClient.search<Street>({
      index: this.INDEX_NAME,
      query: {
        bool: {
          must: [{ wildcard: { street_name: { value: `*${searchText}*` } } }],
          filter: [{ term: { is_active: true } }]
        }
      }
    });
  }


  async fullWordsSearchInElastic(searchText: string): Promise<estypes.SearchResponse<Street>> {
    return await elasticClient.search<Street>({
      index: this.INDEX_NAME,
      query: {
        bool: {
          must: [{ multi_match: { query: searchText, fields: ['*'], operator: 'and' } }],
          filter: [{ term: { is_active: true } }]
        }
      }
    });
  }


  async phraseSearchInElastic(searchText: string): Promise<estypes.SearchResponse<Street>> {
    return await elasticClient.search<Street>({
      index: this.INDEX_NAME,
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: searchText,
                fields: ['*.keyword', 'ID*'],
                type: 'phrase'
              }
            }
          ],
          filter: [{ term: { is_active: true } }]
        }
      }
    });
  }
}

export const searchService = new SearchService();