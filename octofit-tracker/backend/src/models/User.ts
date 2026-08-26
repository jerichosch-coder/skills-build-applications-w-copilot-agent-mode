import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  team: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
