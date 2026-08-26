import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch('/api/workouts/')
      .then((data) => setWorkouts(data))
      .catch(() => setState({ loading: false, error: 'Workouts could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}><div className="workout-grid">
    {workouts.map((workout) => <article className="workout-item" key={workout._id}><div className="workout-top"><span className="eyebrow">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.name}</h3><p>{workout.description}</p><div className="exercise-line">{workout.exercises?.slice(0, 3).join('  /  ')}</div></article>)}
  </div></ResourceState>;
}
