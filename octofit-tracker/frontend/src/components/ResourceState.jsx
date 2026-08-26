export default function ResourceState({ loading, error, children }) {
  if (loading) return <div className="state-panel">Loading your tracker data...</div>;
  if (error) return <div className="state-panel state-error">{error}</div>;
  return children;
}
