import mongoose, { Document } from "mongoose";
export interface IMagicMoverInput {
  name: string
  weightLimit:number
  questState?: "resting" | "loading" | "on-mission";
  items: mongoose.Types.ObjectId[];
}
export interface IMagicMover extends Document {
  name: string;
  weightLimit: number;
  questState: "resting" | "loading" | "on-mission";
  items: mongoose.Types.ObjectId[];
}
