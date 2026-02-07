import dotenv from 'dotenv';
dotenv.config();

export const config = {
  elastic: {
    node: process.env.ELASTIC_NODE || 'http://localhost:9200',
    apiKey: process.env.ELASTIC_API_KEY || '',
    index: 'beersheba_streets',
  },
  server: {
    port: process.env.PORT || 3001,
  }
};