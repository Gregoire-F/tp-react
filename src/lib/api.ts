import { useCallback, useState } from "react";
import { useAppSelector } from "../store/store";

const BASE = import.meta.env.VITE_API_URL;

async function apiFetch<T>(
  method: string,
  path: string,
  body?: unknown,
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message ?? "Erreur serveur");
  }
  return data;
}

export function useApiCall<T>() {
  const token = useAppSelector((s) => s.auth.token);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (method: string, path: string, body?: unknown) => {
      setError(null);
      try {
        const result = await apiFetch<T>(method, path, body, token);
        setData(result);
        return result;
      } catch (err) {
        setError((err as Error).message)
        throw err;
      }
    },
    [token],
  );

  return { data, error, execute };
}
