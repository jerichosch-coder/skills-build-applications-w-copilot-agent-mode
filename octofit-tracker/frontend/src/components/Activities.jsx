import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch('/api/activities/')
      .then((data) => setActivities(data))
      .catch(() => setState({ loading: false, error: 'Activities could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}>
    <div className="table-wrap"><table className="tracker-table"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead><tbody>
      {activities.map((activity) => <tr key={activity._id}><td className="strong">{activity.type}</td><td>{activity.user?.username ?? 'Unknown'}</td><td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned} kcal</td><td>{new Date(activity.date).toLocaleDateString()}</td></tr>)}
    </tbody></table></div>
  </ResourceState>;
}
