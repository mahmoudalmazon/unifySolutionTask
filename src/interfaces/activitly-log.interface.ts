import mongoose, { Document } from "mongoose";

export interface IActivityLog extends Document {
  magicMover: mongoose.Types.ObjectId;
  action: string;
  items?: mongoose.Types.ObjectId[];
  timestamp: Date;
}
