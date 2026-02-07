import type { Request, Response } from 'express';
import { streetManagementService } from '../services/index.js';

export class StreetManagementController {
  
  deleteStreet = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Valid Street ID is required' });
      }

      await streetManagementService.deleteStreetInElastic(id);
      
      res.json({ 
        success: true, 
        message: 'Street successfully marked as inactive' 
      });
    } catch (error) {
      console.error('Delete Controller Error:', error);
      res.status(500).json({ error: 'Failed to delete street' });
    }
  };
}

export const streetManagementController = new StreetManagementController();