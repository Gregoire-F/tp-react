import { useEffect } from "react";
import { useApiCall } from "../lib/api";
import NavBar from "../components/NavBar";
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
      <NavBar />
      <h2 className="font-bold text-xl text-center bg-gray-200 px-4 py-2">Liste des services</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="flex flex-col text-center mx-auto border p-5 border-gray-200">
        {(services ?? []).map((service) => (
          <li key={service.id} className="flex gap-3 p-2 border-b-2 border-gray-200">
            {service.name}
          </li>
        ))}
      </ul>
    </section>
  );
}