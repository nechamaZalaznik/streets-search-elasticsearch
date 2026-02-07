import { Client } from '@elastic/elasticsearch';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  node: config.elastic.node,
  auth: { apiKey: config.elastic.apiKey }
});

const INDEX_NAME = 'beersheba_streets';
const CSV_PATH = path.join(__dirname, '../../data/streets.csv');
const BATCH_SIZE = 500; 

interface CsvRow {
  [key: string]: string | undefined;
}

async function processBatch(data: any[]) {
  try {
    const operations = data.flatMap(doc => [
      { index: { _index: INDEX_NAME } },
      doc
    ]);

    const bulkResponse = await client.bulk({ refresh: true, operations });
    
    if (bulkResponse.errors) {
      console.error('Errors occurred in bulk operation');
    } else {
      console.log(`Successfully indexed ${data.length} documents.`);
    }
  } catch (error) {
    console.error('Failed to process batch:', error);
  }
}

async function runIngestion() {
  let batch: any[] = [];
  console.log('--- Starting Optimized Ingestion Process (UTF-8) ---');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Error: CSV file not found at ${CSV_PATH}`);
    return;
  }

  const stream = fs.createReadStream(CSV_PATH).pipe(csv());

  stream.on('data', async (row: CsvRow) => {
    batch.push({
      street_name: row['שם ראשי'],
      title: row['תואר'],
      secondary_name: row['שם מישני'],
      street_type: row['סוג'],
      neighborhood: row['שכונה'],
      ID_street: row['קוד'],
      is_active: true
    });

    if (batch.length >= BATCH_SIZE) {
      stream.pause();
      const currentBatch = [...batch];
      batch = [];
      await processBatch(currentBatch);
      stream.resume();
    }
  });

  stream.on('end', async () => {
    if (batch.length > 0) {
      await processBatch(batch);
    }
    console.log('✅ Ingestion completed successfully!');
  });

  stream.on('error', (error) => {
    console.error('❌ Stream error:', error);
  });
}

runIngestion();