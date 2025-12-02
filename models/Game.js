import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  game_name: {
    type: String,
    required: [true, "Please provide a name for this game."],
    maxlength: [100, "Game name cannot be more than 100 characters"],
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

  // Your custom ID field
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

// These must be set BEFORE creating the model
GameSchema.set("id", false);
GameSchema.set("toJSON", { virtuals: false });
GameSchema.set("toObject", { virtuals: false });

export default mongoose.models.Game || mongoose.model("Game", GameSchema);