import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { config } from './config/index.js';
import { streetManagementRouter, streetRouter } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = config.server.port;

app.use(cors());
app.use(express.json());

app.use('/api/search', streetManagementRouter);
app.use('/api/streets', streetRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});