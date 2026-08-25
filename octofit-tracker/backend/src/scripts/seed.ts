// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB at', MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  const teams = await Team.insertMany([
    { name: 'Iron Wolves', members: [] },
    { name: 'Thunder Foxes', members: [] },
  ]);

  const users = await User.insertMany([
    { username: 'jsmith', email: 'jsmith@example.com', password: 'hashed_pw_1', age: 28, team: teams[0]._id },
    { username: 'akhan', email: 'akhan@example.com', password: 'hashed_pw_2', age: 34, team: teams[0]._id },
    { username: 'mgarcia', email: 'mgarcia@example.com', password: 'hashed_pw_3', age: 25, team: teams[1]._id },
    { username: 'rpatel', email: 'rpatel@example.com', password: 'hashed_pw_4', age: 30, team: teams[1]._id },
  ]);

  await Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] });
  await Team.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id, users[3]._id] });

  await Activity.insertMany([
    { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 320, date: new Date('2026-08-01') },
    { user: users[1]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 410, date: new Date('2026-08-02') },
    { user: users[2]._id, type: 'Swimming', durationMinutes: 40, caloriesBurned: 380, date: new Date('2026-08-03') },
    { user: users[3]._id, type: 'Yoga', durationMinutes: 60, caloriesBurned: 210, date: new Date('2026-08-04') },
  ]);

  await Leaderboard.insertMany([
    { user: users[0]._id, team: teams[0]._id, points: 1200, rank: 1 },
    { user: users[1]._id, team: teams[0]._id, points: 950, rank: 2 },
    { user: users[2]._id, team: teams[1]._id, points: 1100, rank: 3 },
    { user: users[3]._id, team: teams[1]._id, points: 800, rank: 4 },
  ]);

  await Workout.insertMany([
    { name: 'Full Body Blast', description: 'A full body strength workout', difficulty: 'intermediate', durationMinutes: 45, exercises: ['Squats', 'Push-ups', 'Lunges', 'Plank'] },
    { name: 'Cardio Kickstart', description: 'High-intensity cardio session', difficulty: 'beginner', durationMinutes: 20, exercises: ['Jumping Jacks', 'High Knees', 'Burpees'] },
    { name: 'Advanced Endurance', description: 'Long duration endurance training', difficulty: 'advanced', durationMinutes: 90, exercises: ['Running', 'Rowing', 'Cycling'] },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts inserted.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
