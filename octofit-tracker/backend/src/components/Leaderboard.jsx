import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) for the Codespaces API URL to resolve.
// Falls back to localhost if VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
        else if (Array.isArray(data.results)) setEntries(data.results);
        else if (Array.isArray(data.data)) setEntries(data.data);
        else setEntries([]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading leaderboard: {error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {entries
          .slice()
          .sort((a, b) => a.rank - b.rank)
          .map((entry) => (
            <li key={entry._id}>
              #{entry.rank} - {entry.user?.username ?? 'Unknown'} (
              {entry.team?.name ?? 'No team'}) - {entry.points} pts
            </li>
          ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
