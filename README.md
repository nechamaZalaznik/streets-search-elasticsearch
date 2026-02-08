# 🏙️ מערכת ניהול וחיפוש רחובות – באר שבע

מערכת Full-stack מקצועית לניהול, חיפוש וסינון רחובות העיר באר שבע.  
הפרויקט מדגים שימוש מתקדם ב-Elasticsearch כמנוע חיפוש וביצועים גבוהים בצד הלקוח בעזרת React.

---

## 📋 סקירה כללית

המערכת נבנתה כדי לספק מענה לחיפוש מהיר ודינמי בנתונים עירוניים רחבי היקף. המערכת כוללת:

- 🎨 ממשק משתמש אינטואיטיבי המבוסס על Component-Driven Development  
- ⚙️ שרת API חזק מבוסס Node.js ו-TypeScript  
- 📥 מנגנון Ingestion לעיבוד וטעינת נתונים אוטומטית מקובץ CSV ל-Elasticsearch  

---

## 🛠️ טכנולוגיות בשימוש

### 💻 Frontend
- React 18 (Functional Components & Hooks)
- TypeScript (Strict Mode)
- SASS Modules (Scoped CSS)
- Context API (State Management)

### 🖥️ Backend
- Node.js & Express
- Elasticsearch JS Client
- TypeScript

---

## 🏗️ ארכיטקטורה ונקודות חוזק טכניות

### 🔍 שכבת הנתונים (Elasticsearch)
- שימוש ב-Query DSL לביצוע חיפושים מורכבים (Wildcards, Phrase Matching)
- אופטימיזציה של שאילתות למניעת תוצאות לא רלוונטיות

### ⚡ ניהול סטייט וביצועים
- **Derived State** – צמצום מחזורי רינדור על ידי חישוב ערכים בזמן אמת  
- **Context API** – סנכרון מלא בין מרכיבי החיפוש ללא Prop Drilling  
- **Loading & Initial States** – ניהול חכם של חוויית המשתמש במצבי המתנה ותוצאות ריקות  

### 🗑️ ניהול מדיניות מחיקה (Soft Delete)
- מימוש מחיקה לוגית (`is_active: false`) לשמירה על שלמות הנתונים והיסטוריה

---

## 🚀 הוראות הרצה

### 1. הגדרת משתני סביבה 🔐
יש ליצור קבצי `.env` לפי ההנחיות הבאות:

**בתיקיית backend:**
```env
ELASTIC_NODE=your_elastic_endpoint
ELASTIC_API_KEY=your_api_key
PORT=3001
```

**בתיקיית frontend:**
```env
VITE_API_URL=http://localhost:3001
```

### 2. התקנה וטעינת נתונים 📦
```bash
# התקנת תלויות (יש לבצע בשתי התיקיות)
npm install

# טעינת הנתונים מה-CSV ל-Elasticsearch
cd backend
npm run ingest
```

### 3. הרצת הפרויקט 🏃‍♂️
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

---

## 🔍 מנגנוני חיפוש

- **חיפוש חופשי (Free Search)** – מבוסס Wildcard לחיפוש גמיש בשם הרחוב  
- **מילים מלאות (Exact Match)** – חיפוש מחמיר עם אופרטור AND לדיוק מקסימלי  
- **ביטוי מלא (Phrase Search)** – חיפוש רצף מילים מדויק בשדות מסוג keyword  

---

## 📝 דגשים נוספים

- ✅ הקפדה על Clean Code ושימוש ב-Constants  
- ✅ הפרדה מלאה בין שכבת ה-Data לבין שכבת הלוגיקה  
- ✅ טיפול בשגיאות תקשורת וחוויית משתמש יציבה  
