import { Document } from "mongoose";
export interface IMagicItemInput {
  name: string;
  weight: number;
}
export interface IMagicItem extends Document {
  name: string;
  weight: number;
}
