import { elasticClient } from '../clients/elasticsearch.js';

export class StreetManagementService {
  private readonly INDEX_NAME = 'beersheba_streets';


  async deleteStreetInElastic(id: string): Promise<any> {
    return await elasticClient.update({
      index: this.INDEX_NAME, 
      id: id,
      doc: {
        is_active: false
      }
    });
  }

}

export const streetManagementService = new StreetManagementService();