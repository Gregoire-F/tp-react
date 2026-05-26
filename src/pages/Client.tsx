import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

interface Client {
  id: number;
  name: string;
}

export default function Client() {
  const [client, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) return;
    const fetchClient = async () => {
      try {
        const res = await fetch(
          "https://badger.arcplex.dev/api/v2/admin/client/me",
          {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          },
        );
        if (!res.ok) {
          const errData = await res.json();
          setError(errData.message);
          return;
        }
        const data = await res.json();
        setClients(data);
      } catch {
        setError("Erreur de chargement");
      }
    };
    fetchClient();
  }, [token]);
  return (
    <section>
      <h2>Liste des clients</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {client.map((client) => (
          <li key={client.id}>
            {client.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
