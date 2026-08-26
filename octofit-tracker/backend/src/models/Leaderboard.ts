import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
}, { timestamps: true });

export default model<ILeaderboard>('Leaderboard', LeaderboardSchema);
