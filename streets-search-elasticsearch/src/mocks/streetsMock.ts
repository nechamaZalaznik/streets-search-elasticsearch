import type { Street } from "../types/street";

export const MOCK_STREETS: Street[] = Array.from({ length: 20 }, (_, i) => ({
  _id: `res_${i + 1}`,
  street_name: [
    'רגר', 'ביאליק', 'הרצל', 'זבוטינסקי', 'המכבים', 
    'העצמאות', 'אנילביץ', 'רוטשילד', 'ויצמן', 'השלום'
  ][i % 10] + (i > 9 ? ' ב' : ''),
  street_code: 1000 + i,
  neighborhood: i % 2 === 0 ? 'שכונה א' : 'נווה זאב',
  city_name: 'באר שבע',
  region: i % 3 === 0 ? 'צפון' : 'מרכז',
  last_updated: '2024-05-20',
  isDeleted: false,
}));