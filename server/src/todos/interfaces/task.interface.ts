import { Document } from 'mongoose';
    
export interface ITask extends Document {
  readonly id: string;
  readonly name: string;
  readonly completed: boolean;
}