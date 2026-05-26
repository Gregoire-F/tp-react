import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
// import { useAppSelector } from "../store/store";

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
    <section>
      <h2>Liste des serveurs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {servers.map((server) => (
          <li key={server.id}>
            {server.name} -
            {server.cpu} coeurs -
            {server.ram} Go -
            {server.subnet} -
            {server.os} 
            {server.stock} Go
          </li>
        ))}
      </ul>
    </section>
  );
}

// const token = useAppSelector((state) => state.auth.token);
// useEffect(() => {
//   if (!token) return;
//   const fetchServers = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}admin/server/me`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           credentials: "include",
//         },
//       );
//       if (!res.ok) {
//         const errData = await res.json();
//         setError(errData.message);
//         return;
//       }
//       const data = await res.json();
//       setServers(data);
//     } catch {
//       setError("Erreur de chargement");
//     }
//   };
//   fetchServers();
// }, [token]);