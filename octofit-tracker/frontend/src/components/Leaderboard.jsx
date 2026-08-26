import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch('/api/leaderboard/')
      .then((data) => setEntries(data))
      .catch(() => setState({ loading: false, error: 'Leaderboard could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}><div className="leaderboard-list">
    {entries.map((entry, index) => <div className="leader-row" key={entry._id}><span className={`rank rank-${index + 1}`}>{entry.rank ?? index + 1}</span><div className="leader-person"><strong>{entry.user?.username ?? 'Unknown athlete'}</strong><small>{entry.team?.name ?? 'Independent'}</small></div><strong className="points">{entry.points} pts</strong></div>)}
  </div></ResourceState>;
}
