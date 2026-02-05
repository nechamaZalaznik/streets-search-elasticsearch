import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const node = process.env.ELASTIC_NODE;
const apiKey = process.env.ELASTIC_API_KEY;

if (!node || !apiKey) {
  throw new Error('Missing Elasticsearch configuration in .env file: ELASTIC_NODE or ELASTIC_API_KEY');
}

export const elasticClient = new Client({
  node: node, // עכשיו TS יודע שזה בוודאות string
  auth: {
    apiKey: apiKey
  }
});