import { required } from "joi";
import mongoose, { Schema } from "mongoose";
import { IMagicMover } from "../interfaces/magic-mover.interface";

const MagicMoverSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weightLimit: {
    type: Number,
    required: true,
  },
  questState: {
    type: String,
    enum: ["resting", "loading", "on-mission"],
    default: "resting",
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MagicItem",
    },
  ],
});

export default mongoose.model<IMagicMover>("MagicMover", MagicMoverSchema);
