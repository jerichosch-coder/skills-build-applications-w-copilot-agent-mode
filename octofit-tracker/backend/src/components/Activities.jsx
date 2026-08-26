import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) for the Codespaces API URL to resolve.
// Falls back to localhost if VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setActivities(data);
        else if (Array.isArray(data.results)) setActivities(data.results);
        else if (Array.isArray(data.data)) setActivities(data.data);
        else setActivities([]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading activities: {error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.user?.username ?? 'Unknown user'} - {activity.type} for{' '}
            {activity.durationMinutes} min ({activity.caloriesBurned} cal)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
