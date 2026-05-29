import { useEffect } from "react";
import { useApiCall } from "../lib/api";
import NavBar from "../components/NavBar";

interface Server {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  stock: number;
}

interface Vm {
  id: number;
  os: string;
  server: { id: number; name: string } | string;
}

function vmsOfServer(vms: Vm[], serverId: number) {
  return vms.filter((vm) => {
    const id = typeof vm.server === "object" ? vm.server.id : Number(vm.server);
    return id === serverId;
  });
}

export default function Dashboard() {
  const { data: servers, execute: fetchServers } = useApiCall<Server[]>();
  const { data: vms, execute: fetchVms } = useApiCall<Vm[]>();

  useEffect(() => {
    fetchServers("GET", "admin/server/me");
    fetchVms("GET", "admin/vm/me");
  }, [fetchServers, fetchVms]);

  return (
    <main>
      <header>
        <NavBar />
      </header>

      <article className="mx-auto max-7-w-xl py-8 px-6 rounded border border-slate-300 border-t-4 border-t-black">
        <div className="p-4 border-b-4 border-amber-500"><h2 className="text-xl font-semibold">🏠 Accueil</h2></div>
        <div className="relative w-full overflow-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  OS
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  VM count
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used CPU
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used RAM
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Used Storage
                </th>
              </tr>
            </thead>
            <tbody>
              {(servers ?? []).map((server) => {
                const serverVms = vmsOfServer(vms ?? [], server.id);
                const osList = [...new Set(serverVms.map((vm) => vm.os))].join(
                  ", ",
                );

                return (
                  <tr key={server.id} className="border-b">
                    <td className="p-4 align-middle">{server.name}</td>
                    <td className="p-4 align-middle">{osList || "—"}</td>
                    <td className="p-4 align-middle">{serverVms.length}/{serverVms.length}</td>
                    <td className="p-4 align-middle">{server.cpu} Coeurs</td>
                    <td className="p-4 align-middle">{server.ram} Go</td>
                    <td className="p-4 align-middle">{server.stock} Go</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  );
}
