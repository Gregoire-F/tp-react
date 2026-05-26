const BASE = import.meta.env.VITE_API_URL;
export async function apiGet<T>(path: string): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include",
  });
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: "Erreur serveur" };
    }
    throw new Error(errorData.message);
  }
  return res.json();
}
