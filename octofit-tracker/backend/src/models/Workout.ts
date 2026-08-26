import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
}, { timestamps: true });

export default model<IWorkout>('Workout', WorkoutSchema);
