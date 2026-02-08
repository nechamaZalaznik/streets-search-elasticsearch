import type { estypes } from '@elastic/elasticsearch';
import { elasticClient } from '../clients/elasticsearch.js';
import { config } from '../config/index.js';
import type { Street } from '../types/street.js';

export class StreetManagementService {


  async deleteStreetInElastic(id: string): Promise<estypes.UpdateResponse<Street>> {
    return await elasticClient.update({
      index: config.elastic.index, 
      id: id,
      doc: {
        is_active: false
      }
    });
  }

}

export const streetManagementService = new StreetManagementService();