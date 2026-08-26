import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

const workoutsCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsEndpoint = workoutsCodespaceName
  ? `https://${workoutsCodespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch(workoutsEndpoint)
      .then((data) => setWorkouts(data))
      .catch(() => setState({ loading: false, error: 'Workouts could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}>
    <div className="table-wrap"><table className="tracker-table"><thead><tr><th>Workout</th><th>Difficulty</th><th>Duration</th><th>Description</th></tr></thead><tbody>
      {workouts.map((workout) => <tr key={workout._id}><td className="strong">{workout.name}</td><td>{workout.difficulty ?? '-'}</td><td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '-'}</td><td>{workout.description ?? '-'}</td></tr>)}
    </tbody></table></div>
  </ResourceState>;
}
