import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  node: process.env.ELASTIC_NODE!,
  auth: { apiKey: process.env.ELASTIC_API_KEY || '' }
});

const INDEX_NAME = 'beersheba_streets';
const CSV_PATH = path.join(__dirname, '../../data/streets.csv');

interface CsvRow {
  [key: string]: string | undefined;
}

async function runIngestion() {
  const streets: any[] = [];
  console.log('--- Starting Ingestion Process (UTF-8) ---');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Error: CSV file not found at ${CSV_PATH}`);
    return;
  }

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row: CsvRow) => {
      // מיפוי מדויק לפי הכותרות שמצאתי בקובץ שלך
      streets.push({
        street_name: row['שם ראשי'],
        title: row['תואר'],
        secondary_name: row['שם מישני'], // תוקן: עם י'
        street_type: row['סוג'],
        neighborhood: row['שכונה'],
        ID_street: row['קוד'],
        is_active: true
      });
    })
    .on('end', async () => {
      if (streets.length > 0) {
        console.log('דגימת נתונים (עברית תקינה!):', streets[0]);
      }

      try {
        const operations = streets.flatMap(doc => [
          { index: { _index: INDEX_NAME } },
          doc
        ]);

        const bulkResponse = await client.bulk({ refresh: true, operations });

        if (bulkResponse.errors) {
          console.error('Bulk errors occurred.');
        } else {
          console.log(`✅ Success! Indexed ${streets.length} documents into ${INDEX_NAME}`);
        }
      } catch (error) {
        console.error('❌ Failed:', error);
      }
    });
}

runIngestion();