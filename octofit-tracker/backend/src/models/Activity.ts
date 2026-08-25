import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

export default model<IActivity>('Activity', ActivitySchema);
