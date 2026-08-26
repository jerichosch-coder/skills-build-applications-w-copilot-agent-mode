import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

const teamsCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsEndpoint = teamsCodespaceName
  ? `https://${teamsCodespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch(teamsEndpoint)
      .then((data) => setTeams(data))
      .catch(() => setState({ loading: false, error: 'Teams could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}><div className="team-grid">
    {teams.map((team) => <article className="team-item" key={team._id}><div className="team-mark">{team.name.slice(0, 1)}</div><div><h3>{team.name}</h3><p>{team.members?.length ?? 0} members</p></div><span className="arrow">&#8594;</span></article>)}
  </div></ResourceState>;
}
