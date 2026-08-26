import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const PORT = 8000;
const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'Octofit Tracker API is running' });
});

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB at', MONGO_URI);

  app.listen(PORT, () => {
    const codespaceName = process.env.CODESPACE_NAME;
    console.log(`Octofit Tracker API listening on http://localhost:${PORT}`);
    if (codespaceName) {
      console.log(`Codespaces public API URL: https://${codespaceName}-${PORT}.app.github.dev`);
    }
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
