import { useEffect, useState } from 'react';
import { apiFetch } from '../api.js';
import ResourceState from './ResourceState.jsx';

const usersCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersEndpoint = usersCodespaceName
  ? `https://${usersCodespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  useEffect(() => {
    apiFetch(usersEndpoint)
      .then((data) => setUsers(data))
      .catch(() => setState({ loading: false, error: 'Users could not be loaded.' }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  }, []);

  return <ResourceState {...state}>
    <div className="table-wrap"><table className="tracker-table"><thead><tr><th>Member</th><th>Email</th><th>Age</th><th>Team</th></tr></thead><tbody>
      {users.map((user) => <tr key={user._id}><td className="strong">{user.username}</td><td>{user.email}</td><td>{user.age ?? '-'}</td><td>{user.team?.name ?? 'Unassigned'}</td></tr>)}
    </tbody></table></div>
  </ResourceState>;
}
