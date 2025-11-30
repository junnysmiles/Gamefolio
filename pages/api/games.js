import mongoose from 'mongoose';
import dbConnect from '../../lib/mongo/dbConnect';

// --- Data Model (models/Game.js) ---

// Define the Schema using the details you provided
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
});

const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

// --- API Route Handler ---

export default async function handler(req, res) {
  await dbConnect();

    // --- NEW DEBUG: Confirm the Database Name ---
  const db = mongoose.connection;
  console.log(`Mongoose is querying database: ${db.name}`);
  // ------------------------------------------

  const { method } = req;

  if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {    
    console.log(`Querying collection: ${Game.collection.name}`);

    const games = await Game.find({});
    const documentCount = await Game.countDocuments({});
    
    console.log(`Query successful. Documents found: ${documentCount}`);
    
       // Attempt 1: Standard Mongoose Query
    const mongooseGames = await Game.find({});
    console.log(`[DEBUG] Attempt 1 (Mongoose.find) Documents found: ${mongooseGames.length}`);

    // Attempt 2: Native MongoDB Driver Query (less strict on schema)
    const nativeGames = await Game.collection.find({}).toArray();
    console.log(`[DEBUG] Attempt 2 (Native Driver) Documents found: ${nativeGames.length}`);
    
    if (games.length === 0) {
        console.log("No documents returned. Collection might be empty.");
    } else {
        console.log(`Found ${games.length} documents.`);
    }

    res.status(200).json({ success: true, data: games });

  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ success: false, error: 'Failed to fetch data from MongoDB.', details: error.message });
  }
}