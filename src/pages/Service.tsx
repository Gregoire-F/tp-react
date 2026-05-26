import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

interface Service {
  id: number;
  name: string;
}

export default function Service() {
  const [service, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) return;
    const fetchService = async () => {
      try {
        const res = await fetch(
          "https://badger.arcplex.dev/api/v2/admin/service/me",
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
        setServices(data);
      } catch {
        setError("Erreur de chargement");
      }
    };
    fetchService();
  }, [token]);
  return (
    <section>
      <h2>Liste des services</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {service.map((service) => (
          <li key={service.id}>
            {service.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
