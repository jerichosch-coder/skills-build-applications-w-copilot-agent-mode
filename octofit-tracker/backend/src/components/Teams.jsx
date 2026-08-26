import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) for the Codespaces API URL to resolve.
// Falls back to localhost if VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setTeams(data);
        else if (Array.isArray(data.results)) setTeams(data.results);
        else if (Array.isArray(data.data)) setTeams(data.data);
        else setTeams([]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading teams: {error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            {team.name} - {team.members?.length ?? 0} member(s)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
