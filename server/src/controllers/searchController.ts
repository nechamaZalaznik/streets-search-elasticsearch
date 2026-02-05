import type { Request, Response } from 'express';
import * as searchService from '../services/searchService.js';

// פונקציית עזר לעיבוד תוצאות
const formatResults = (result: any) => result.hits.hits.map((hit: any) => ({
  id: hit._id,
  ...hit._source
}));

export const freeSearch = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = await searchService.freeSearchInElastic(q || '');
  res.json(formatResults(result));
};

export const fullWordsSearch = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = await searchService.fullWordsSearchInElastic(q || '');
  res.json(formatResults(result));
};

export const phraseSearch = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = await searchService.phraseSearchInElastic(q || '');
  res.json(formatResults(result));
};