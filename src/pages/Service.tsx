import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
interface Service {
  id: number;
  name: string;
}
export default function Service() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await apiGet<Service[]>("admin/service/me");
        setServices(data);
      } catch (err) {
        setError("Erreur de chargement");
      }
    };
    fetchService();
  }, []);
  return (
    <section>
      <h2>Liste des services</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name}
          </li>
        ))}
      </ul>
    </section>
  );
}