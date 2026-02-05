import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/searchRoutes.js';
import streetManagementRoutes from './routes/streetManagementRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// כל מה שקשור לחיפושים (free, words, phrase)
app.use('/api/search', searchRoutes);

// כל מה שקשור לניהול רחובות (כרגע רק מחיקה)
app.use('/api/streets', streetManagementRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});