import { useEffect } from "react";
import { useApiCall } from "../lib/api";

interface Vm {
  id: number;
  name: string;
  os: string;
  cpu: number;
  ram: number;
  stock:number;
}

export default function Vm() {
  const { data: vm, error, execute } = useApiCall<Vm[]>();
  useEffect(() => {
    execute("GET", "admin/vm/me");
  }, [execute]);
  return (
    <section>
      <h2>Liste des Vm</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(vm ?? []).map((vm) => (
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
