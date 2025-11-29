import mongoose from 'mongoose';
import dbConnect from '../../lib/mongo/dbConnect';

// --- Data Model (models/Game.js) ---

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

// The check prevents redefining the model on hot reload in Next.js
const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);


// --- API Route Handler (pages/api/games.js) ---

export default async function handler(req, res) {
  // 1. Establish the database connection
  await dbConnect();

  // 2. Handle the request method
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Fetch all documents from the 'games' collection
        const games = await Game.find({});

        // Respond with a 200 OK status and the data
        res.status(200).json({ success: true, data: games });
      } catch (error) {
        // Log the error and send a 400 status
        console.error("Error fetching games:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // You can add 'POST', 'PUT', 'DELETE' cases here for other operations
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}