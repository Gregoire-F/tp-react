import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
// import { useAppSelector } from "../store/store";

interface Server {
  id: number;
  name: string;
  cpu: number;
  public_ip: number;
  subnet: string;
  ssh_port: number;
  hypervisor: string;
  proxy_manager: string;
  firewall: string;
  stock: number;
  ram: number;
  ssh_port_allocation: number;
  port: number;
  public_url: string;
  private_ip: null;
}

export default function Server() {
  const [servers, setServers] = useState<Server[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await apiGet<Server[]>("admin/service/me");
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
            {server.name}
            {server.cpu}
            {server.public_ip}
            {server.subnet}
            {server.ram}
            {server.public_url}
            {server.stock}
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