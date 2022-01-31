import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Task extends Document {

  @Prop({ unique: true })
  id: string;

  @Prop({ unique: true })
  name: string;

  @Prop()
  completed: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);