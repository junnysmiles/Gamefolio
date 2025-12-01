import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongo/dbConnect';

const GameSchema = new mongoose.Schema({
  game_name: {
    type: String,
    required: [true, 'Please provide a name for this game.'],
    maxlength: [100, 'Game name cannot be more than 100 characters'],
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
  display_id: {
    type: Number,
    required: true,
    unique: true,
  }
});

const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

// --- API Route Handler ---

export default async function handler(req, res) {
  await dbConnect();

  // Confirm the Database Name ---
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

    const games = await Game.find({}).lean();
    const documentCount = await Game.countDocuments({});
    
    console.log(`Query successful. Documents found: ${documentCount}`);
    
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