 /**
  * PUBLIC_INTERFACE
  * Placeholder API client. Replace with real backend base URL and auth headers.
  */
export async function apiGet(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}
