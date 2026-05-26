import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

interface Vm {
  id: number;
  name: string;
  os: string;
  cpu: number;
  ram: number;
  stock:number;
}

export default function Vm() {
  const [servers, setServers] = useState<Vm[]>([]);
  const [error, setError] = useState("");
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) return;
    const fetchServers = async () => {
      try {
        const res = await fetch(
          "https://badger.arcplex.dev/api/v2/admin/vm/me",
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
        setServers(data);
      } catch {
        setError("Erreur de chargement");
      }
    };
    fetchServers();
  }, [token]);
  return (
    <section>
      <h2>Liste des Vm</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {servers.map((vm) => (
          <li key={vm.id}>
            {vm.name}
            {vm.cpu}
            {vm.ram}
          </li>
        ))}
      </ul>
    </section>
  );
}
