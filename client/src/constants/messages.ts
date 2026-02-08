export const UI_MESSAGES = {
  TITLES: {
    MAIN_SYSTEM: 'מערכת ניהול רחובות',
  },
  SEARCH: {
    LOADING: 'מחפש...',
    IDLE: 'חיפוש',
    NO_RESULTS: 'לא נמצאו תוצאות עבור החיפוש שלך', 
    PLACEHOLDER_DEFAULT: 'הקלד לחיפוש...', 
  },
  ERRORS: {
    SERVER_CONNECTION: 'שגיאה בחיבור לשרת',
    DELETE_FAILED: 'המחיקה נכשלה',
  },
  ACTIONS: {
    DELETE_TITLE: 'מחק רשומה',
    DELETE_CONFIRM: 'מחק',
    DELETE_CANCEL: 'ביטול', 
    DELETE_QUESTION: 'האם אתה בטוח שברצונך למחוק רחוב זה?',
    DELETING_PROCESS: 'מוחק רחוב...', 
    DELETE_SUCCESS: 'הרחוב נמחק בהצלחה', 
  },
} as const;