import { elasticClient } from '../clients/elasticsearch.js';

export class SearchService {
  private readonly INDEX_NAME = 'beersheba_streets';


  async freeSearchInElastic(q: string): Promise<any> {
    return await elasticClient.search({
      index: this.INDEX_NAME,
      query: {
        bool: {
          must: [{ wildcard: { street_name: { value: `*${q}*` } } }],
          filter: [{ term: { is_active: true } }]
        }
      }
    });
  }


  async fullWordsSearchInElastic(q: string): Promise<any> {
    return await elasticClient.search({
      index: this.INDEX_NAME,
      query: {
        bool: {
          must: [{ multi_match: { query: q, fields: ['*'], operator: 'and' } }],
          filter: [{ term: { is_active: true } }]
        }
      }
    });
  }


  async phraseSearchInElastic(q: string): Promise<any> {
    return await elasticClient.search({
      index: this.INDEX_NAME,
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
  }
}

export const searchService = new SearchService();