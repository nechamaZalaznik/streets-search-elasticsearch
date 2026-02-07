import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Elasticsearch client for ingestion
const client = new Client({
  node: process.env.ELASTIC_NODE!,
  auth: { apiKey: process.env.ELASTIC_API_KEY || '' }
});

const INDEX_NAME = 'beersheba_streets';
const CSV_PATH = path.join(__dirname, '../../data/streets.csv');

interface CsvRow {
  [key: string]: string | undefined;
}

/**
 * Main ingestion script: 
 * Reads street data from a CSV file, maps it to a JSON structure, 
 * and performs a Bulk upload to Elasticsearch.
 */
async function runIngestion() {
  const streets: any[] = [];
  console.log('--- Starting Ingestion Process (UTF-8) ---');

  // Verify file existence before starting the stream
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Error: CSV file not found at ${CSV_PATH}`);
    return;
  }

  // Stream the CSV file to handle memory efficiency for large datasets
  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row: CsvRow) => {
      // Mapping Hebrew CSV columns to structured JSON documents
      streets.push({
        street_name: row['שם ראשי'],
        title: row['תואר'],
        secondary_name: row['שם מישני'], 
        street_type: row['סוג'],
        neighborhood: row['שכונה'],
        ID_street: row['קוד'],
        is_active: true // Initializing status for the soft-delete logic
      });
    })
    .on('end', async () => {
      if (streets.length > 0) {
        console.log('Sample data (Verify Hebrew encoding):', streets[0]);
      }

      try {
        /**
         * Prepare operations for the Bulk API.
         * The structure requires an action object followed by the document itself.
         */
        const operations = streets.flatMap(doc => [
          { index: { _index: INDEX_NAME } },
          doc
        ]);

        const bulkResponse = await client.bulk({ refresh: true, operations });

        if (bulkResponse.errors) {
          console.error('Bulk errors occurred during ingestion.');
        } else {
          console.log(`✅ Success! Indexed ${streets.length} documents into ${INDEX_NAME}`);
        }
      } catch (error) {
        console.error('❌ Ingestion Failed:', error);
      }
    });
}

runIngestion();