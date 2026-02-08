import { SearchMode, type SearchOption } from "../types/SearchType";

export const SEARCH_OPTIONS: readonly SearchOption[] = [
  { 
    id: SearchMode.FREE, 
    label: 'חיפוש חופשי- רק לפי שם הרחוב', 
    placeholder: 'הקלד שם רחוב לחיפוש...' 
  },
  { 
    id: SearchMode.EXACT, 
    label: 'חיפוש מדויק לפי כל שדה', 
    placeholder: 'הקלד מילה לחיפוש מדויק...' 
  },
  { 
    id: SearchMode.PHRASE, 
    label: 'חיפוש ביטוי שלם- לפי כל שדה', 
    placeholder: 'הקלד ביטוי מלא לחיפוש...' 
  },
] as const;