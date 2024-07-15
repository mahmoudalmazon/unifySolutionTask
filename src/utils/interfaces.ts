
import { Request } from 'express';

export const test = 'test';
export interface CustomRequest extends Request {
  user?: any; // Update 'any' with the appropriate type for the 'user' property
}