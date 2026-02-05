import { elasticClient } from '../lib/elasticsearch.js';

const INDEX_NAME = 'beersheba_streets';

// 1. חיפוש חופשי - חצאי מילים - רק בשם הרחוב
export const freeSearchInElastic = async (q: string): Promise<any> => {
  return await elasticClient.search({
    index: INDEX_NAME,
    query: {
      bool: {
        must: [{ wildcard: { street_name: { value: `*${q}*` } } }],
        filter: [{ term: { is_active: true } }]
      }
    }
  });
};

// 2. מילים מלאות - בכל השדות
export const fullWordsSearchInElastic = async (q: string): Promise<any> => {
  return await elasticClient.search({
    index: INDEX_NAME,
    query: {
      bool: {
        must: [{ multi_match: { query: q, fields: ['*'], operator: 'and' } }],
        filter: [{ term: { is_active: true } }]
      }
    }
  });
};

// 3. ביטוי מלא (Phrase) - בכל השדות
export const phraseSearchInElastic = async (q: string): Promise<any> => {
  return await elasticClient.search({
    index: INDEX_NAME,
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: q,
              // התיקון: פנייה ספציפית לתתי-השדות מסוג keyword
              // אלסטיק יוצר אותם אוטומטית לכל שדה טקסט אם לא הגדרת אחרת
              fields: [
                'street_name.keyword',
                'neighborhood.keyword',
                'secondary_name.keyword'
              ],
              type: 'phrase'
            }
          }
        ],
        filter: [{ term: { is_active: true } }]
      }
    }
  });
};