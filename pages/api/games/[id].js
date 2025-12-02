import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongo/dbConnect';
import Game from '../../../models/Game'

// --- API Route Handler ---

export default async function apiHandler(req, res) {
  await dbConnect();
  
  const { 
    query,
    method,
  } = req;

  const id = query.id; 

  console.log(query.id)

  if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId) || numericId < 1) {
       return res.status(400).json({ 
        success: false, 
        error: `Invalid display ID format provided. ID must be a positive number. Received: ${id}` 
      });
    }
    
    const game = await Game.findOne({ id: numericId }).lean();
    delete game._id;

    console.log("Returned game:", game);

    if (!game) {
      // 404: Game not found in the database
      return res.status(404).json({ 
        success: false, 
        error: `Game with display ID ${numericId} not found.` 
      });
    }

    res.status(200).json(game); 

  } catch (error) {
    console.error(`[API ERROR] Error fetching game ID ${id}:`, error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Database query failed due to internal error.', 
      details: error.message 
    });
  }
}