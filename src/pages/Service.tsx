import { useEffect } from "react";
import { useApiCall } from "../lib/api";
interface Service {
  id: number;
  name: string;
}
export default function Service() {
  const { data: services, error, execute } = useApiCall<Service[]>();
  useEffect(() => {
    execute("GET", "admin/service/me");
  }, [execute]);
  return (
    <section>
      <h2>Liste des services</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(services ?? []).map((service) => (
          <li key={service.id}>
            {service.name}
          </li>
        ))}
      </ul>
    </section>
  );
}