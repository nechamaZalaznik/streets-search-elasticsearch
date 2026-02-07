import type { Request, Response } from 'express';
import { searchService } from '../services/index.js'; 

export class SearchController {
  

  private formatResults(result: any) {
    return result.hits.hits.map((hit: any) => ({
      id: hit._id,
      ...hit._source
    }));
  }

  freeSearch = async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string) || '';
      const result = await searchService.freeSearchInElastic(q);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Free search failed' });
    }
  };

  fullWordsSearch = async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string) || '';
      const result = await searchService.fullWordsSearchInElastic(q);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Full words search failed' });
    }
  };

 
  phraseSearch = async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string) || '';
      const result = await searchService.phraseSearchInElastic(q);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Phrase search failed' });
    }
  };
}

export const searchController = new SearchController();