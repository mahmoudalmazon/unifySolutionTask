import { required } from "joi";
import mongoose, { Schema } from "mongoose";
import { IMagicItem } from "../interfaces/magic-item.interface";

const MagicItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
});

export default mongoose.model<IMagicItem>("MagicItem", MagicItemSchema);
