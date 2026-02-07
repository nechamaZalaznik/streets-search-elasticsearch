import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const node = process.env.ELASTIC_NODE;
const apiKey = process.env.ELASTIC_API_KEY;

// Fail early if configuration is missing to prevent runtime connection errors
if (!node || !apiKey) {
  throw new Error('Missing Elasticsearch configuration in .env file: ELASTIC_NODE or ELASTIC_API_KEY');
}

/**
 * Global Elasticsearch client instance.
 * Shared across the application to manage connection pooling efficiently.
 */
export const elasticClient = new Client({
  node: node, 
  auth: {
    apiKey: apiKey
  }
});