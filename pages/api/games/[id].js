import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongo/dbConnect';

const GameSchema = new mongoose.Schema({
  game_name: {
    type: String,
    required: [true, 'Please provide a name for this game.'],
    maxlength: [100, 'Game name cannot be more than 100 characters'],
  },
  review: {
    type: String,
    required: false,
  },
  last_played: {
    type: Date,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  number_of_achievements: {
    type: Number,
    required: false,
    min: 0,
  },
  number_achieved: {
    type: Number,
    required: false,
    min: 0,
  },
  percentage_completed: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  hours_played: {
    type: Number,
    required: false,
    min: 0,
  },
  finished_game: {
    type: String,
    required: false,
  },
  isFinished: {
    type: Boolean,
    required: false,
    default: false,
  },
  display_id: {
    type: Number,
    required: true,
    unique: true,
  }
});

// Check if the model already exists before creating it (Next.js requirement)
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

// --- API Route Handler ---

export default async function handler(req, res) {
  // 1. Ensure connection is established
  await dbConnect();
  
  const { 
    query,
    method,
  } = req;

  // Extracts the ID from the query parameters, favoring 'id' (from [id].js)
  const id = query.id || query._id; 

  if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    // 2. CONVERSION and VALIDATION: Convert the string ID from the URL to an integer.
    
    // Check if the ID parameter was actually provided in the URL
    if (!id) {
       return res.status(400).json({ 
        success: false, 
        error: `Missing ID parameter. Please ensure a display ID is provided in the URL path.`
      });
    }

    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId) || numericId < 1) {
       return res.status(400).json({ 
        success: false, 
        error: `Invalid display ID format provided. ID must be a positive number. Received: ${id}` 
      });
    }
    
    // 3. QUERY: Use findOne() to query by the specific 'display_id' field.
    const game = await Game.findOne({ display_id: numericId }).lean();


    if (!game) {
      // 404: Game not found in the database
      return res.status(404).json({ 
        success: false, 
        error: `Game with display ID ${numericId} not found.` 
      });
    }

    // 4. Success: return the single game document
    // NOTE: Returning the game object directly (not wrapped in { success: true, data: game })
    // as your frontend expects the raw JSON object.
    res.status(200).json(game); 

  } catch (error) {
    // This catches general database connection or unexpected errors
    console.error(`[API ERROR] Error fetching game ID ${id}:`, error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Database query failed due to internal error.', 
      details: error.message 
    });
  }
}