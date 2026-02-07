import type { Request, Response } from 'express';
import { deleteStreetInElastic } from '../services/streetService.js';

/**
 * Performs a soft delete by updating the street's status to inactive.
 * This ensures data integrity while hiding the record from search results.
 */
export const deleteStreet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID existence and type before processing
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Valid Street ID is required' });
    }

    // Call service to update is_active: false in Elasticsearch
    await deleteStreetInElastic(id);
    
    res.json({ 
      success: true, 
      message: 'Street successfully marked as inactive' 
    });
  } catch (error) {
    console.error('Delete Controller Error:', error);
    res.status(500).json({ error: 'Failed to delete street' });
  }
};