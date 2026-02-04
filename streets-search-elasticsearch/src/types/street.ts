export interface Street {
  _id: string;          // מזהה ייחודי של המסמך באלסטיק
  street_name: string;  // שם הרחוב (זה השדה העיקרי לחיפוש)
  street_code: number;  // קוד הרחוב
  neighborhood?: string; // שכונה (אופציונלי)
  city_name: string;    // שם העיר (באר שבע)
  region?: string;      // אזור בעיר
  last_updated: string; // תאריך עדכון אחרון
  isDeleted: boolean;   // חשוב מאוד עבור ה"מחיקה הלוגית" שביקשו במטלה
}