const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const payload = await response.json();
  if (Array.isArray(payload)) return payload;
  return payload.data ?? payload.results ?? payload.items ?? [];
}
