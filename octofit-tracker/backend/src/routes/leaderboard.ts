import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const board = await Leaderboard.find().populate('user').populate('team').sort({ rank: 1 });
  res.json(board);
});

export default router;
