import { useEffect } from "react";
import { useApiCall } from "../lib/api";
import NavBar from "../components/NavBar";

interface Client {
  id: number;
  name: string;
}

export default function Client() {
  const { data: client, error, execute } = useApiCall<Client[]>();
  useEffect(() => {
    execute("GET", "admin/client/me");
  }, [execute]);
  return (
    <section>
      <NavBar />
      <h2>Liste des clients</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(client ?? []).map((client) => (
          <li key={client.id}>
            {client.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
