import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) for the Codespaces API URL to resolve.
// Falls back to localhost if VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setWorkouts(data);
        else if (Array.isArray(data.results)) setWorkouts(data.results);
        else if (Array.isArray(data.data)) setWorkouts(data.data);
        else setWorkouts([]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading workouts: {error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.name}</strong> ({workout.difficulty}) - {workout.durationMinutes} min
            <br />
            {workout.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
