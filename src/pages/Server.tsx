import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";

interface Server {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  os: string;
  subnet: string;
  stock: number;
}

export default function Server() {
  const [servers, setServers] = useState<Server[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await apiGet<Server[]>("admin/server/me");
        setServers(data);
      } catch (err) {
        setError("Erreur de chargement");
      }
    };
    fetchService();
  }, []);

  return (
    <section className="flex justify-center flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl bg-gray-300 px-4 py-2">Liste des serveurs</h2>
        <button className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer">Ajouter un serveur</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {servers.map((server) => (
          <li key={server.id}>
            {server.name} -{server.cpu} coeurs -{server.ram} Go -{server.subnet}{" "}
            -{server.os}
            {server.stock} Go
          </li>
        ))}
      </ul>
    </section>
  );
}

