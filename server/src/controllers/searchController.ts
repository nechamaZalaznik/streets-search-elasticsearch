import type { estypes } from '@elastic/elasticsearch';
import type { Request, Response } from 'express';
import { searchService } from '../services/index.js';
import type { Street } from '../types/street.js';
export class SearchController {


  private formatResults(result: estypes.SearchResponse<Street>): Street[] {
    return result.hits.hits.map((hit) => ({
      ...(hit._source as Street),
      id: hit._id as string,
    }));
  }

  freeSearch = async (req: Request, res: Response) => {
    try {
      const searchText = (req.query.searchText as string) || '';
      if (!searchText.trim()) {
        return res.json([]);
      }
      const result = await searchService.freeSearchInElastic(searchText);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Free search failed' });
    }
  };

  fullWordsSearch = async (req: Request, res: Response) => {
    try {
      const searchText = (req.query.searchText as string) || '';
      if (!searchText.trim()) {
        return res.json([]);
      }
      const result = await searchService.fullWordsSearchInElastic(searchText);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Full words search failed' });
    }
  };


  phraseSearch = async (req: Request, res: Response) => {
    try {
      const searchText = (req.query.searchText as string) || '';
      if (!searchText.trim()) {
        return res.json([]);
      }
      const result = await searchService.phraseSearchInElastic(searchText);
      res.json(this.formatResults(result));
    } catch (error) {
      res.status(500).json({ error: 'Phrase search failed' });
    }
  };
}

export const searchController = new SearchController();