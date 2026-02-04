export type SearchMode = 'FREE' | 'EXACT' | 'PHRASE';

export const SEARCH_OPTIONS = [
  { id: 'FREE', label: 'חיפוש חופשי- רק לפי שם הרחוב', placeholder: 'הקלד שם רחוב לחיפוש...' },
  { id: 'EXACT', label: 'חיפוש מדויק לפי כל שדה', placeholder: 'הקלד מילה לחיפוש מדויק...' },
  { id: 'PHRASE', label: 'חיפוש ביטוי שלם- לפי כל שדה', placeholder: 'הקלד ביטוי מלא לחיפוש...' },
] as const;