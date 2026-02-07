import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import { config } from '../config/index.js';

dotenv.config();

const node = config.elastic.node;
const apiKey = config.elastic.apiKey;

if (!node || !apiKey) {
  throw new Error('Missing Elasticsearch configuration in .env file: ELASTIC_NODE or ELASTIC_API_KEY');
}

export const elasticClient = new Client({
  node: node, 
  auth: {
    apiKey: apiKey
  }
});