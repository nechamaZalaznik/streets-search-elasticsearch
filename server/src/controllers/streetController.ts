import type { Request, Response } from 'express';
import { deleteStreetInElastic } from '../services/streetService.js';

export const deleteStreet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type Narrowing: מוודא שה-ID קיים לפני שליחה ל-Service
   if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Valid Street ID is required' });
    }

    // עדכון הסטטוס באלסטיק ל-is_active: false
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