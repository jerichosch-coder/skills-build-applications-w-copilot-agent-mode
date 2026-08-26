import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) for the Codespaces API URL to resolve.
// Falls back to localhost if VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else if (Array.isArray(data.results)) setUsers(data.results);
        else if (Array.isArray(data.data)) setUsers(data.data);
        else setUsers([]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email}) - Age {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
