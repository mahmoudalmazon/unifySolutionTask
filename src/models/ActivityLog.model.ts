import { required } from "joi";
import mongoose, { Schema } from "mongoose";
import { IActivityLog } from "../interfaces/activitly-log.interface";

const ActivityLogSchema: Schema = new Schema({
  magicMover: {
    type: Schema.Types.ObjectId,
    ref: "MagicMover",
    required: true,
  },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "MagicItem",
    },
  ],
});

export default mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
