import express from 'express';
import cors from 'cors';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const elasticNode = process.env.ELASTIC_NODE;

if (!elasticNode) {
  throw new Error('ELASTIC_NODE is not defined in environment variables');
}

const client = new Client({
  node: elasticNode,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || ''
  }
});

// בדיקת חיבור בסיסית
app.get('/health', async (req, res) => {
  try {
    await client.ping();
    res.send({ status: 'OK', message: 'Connected to Elasticsearch' });
  } catch (error) {
    res.status(500).send({ status: 'Error', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});