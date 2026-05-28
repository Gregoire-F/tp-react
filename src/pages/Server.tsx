import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApiCall } from "../lib/api";
import ServeurFormModal from "../components/ServeurFormModal";

interface Server {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  subnet: string;
  stock: number;
  hypervisor: string;
  public_ip: string;
  ssh_port: string;
}
interface ServerForm {
  name: string;
  cpu: string;
  ram: string;
  subnet: string;
  stock: string;
  hypervisor: string;
  public_ip: string;
  ssh_port: string;
}

const initialForm: ServerForm = {
  name: "",
  cpu: "",
  ram: "",
  subnet: "",
  stock: "",
  hypervisor: "",
  public_ip: "",
  ssh_port: "",
};

export default function Server() {
  const { data: servers, error, execute } = useApiCall<Server[]>();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ServerForm>(initialForm);
  const [editingServer, setEditingServer] = useState<Server | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    execute("GET", "admin/server/me");
  }, [execute]);

  const handleChange =
    (field: keyof ServerForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const body = {
      name: form.name,
      cpu: Number(form.cpu),
      ram: Number(form.ram),
      subnet: form.subnet,
      stock: Number(form.stock),
      hypervisor: form.hypervisor,
      public_ip: form.public_ip,
      ssh_port: form.ssh_port,
    };
    try {
      if (editingServer) {
        await execute("PATCH", `admin/server/${editingServer.id}`, body);
      } else {
        await execute("POST", "admin/server", body);
      }
      setShowModal(false);
      setEditingServer(null);
      setForm(initialForm);
      await execute("GET", "admin/server/me");
    } catch {
      setFormError(
        editingServer
          ? "Erreur lors de la modification du serveur"
          : "Erreur lors de l'ajout du serveur",
      );
    }
  };
  const handleDelete = async (id: number) => {
  if (!confirm("Supprimer ce serveur ?")) return;
  try {
    await execute("DELETE", `admin/server/${id}`);
    await execute("GET", "admin/server/me");
  } catch {
    setFormError("Erreur lors de la suppression");
  }
};
  return (
    <section className="flex justify-center flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl bg-gray-300 px-4 py-2">
          Liste des serveurs
        </h2>
        <button
          className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Ajouter un serveur
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(servers ?? []).map((server) => (
          <li key={server.id}>
            {server.name} -{server.cpu} coeurs -{server.ram} Go -{server.subnet}
            {server.stock} Go -{server.hypervisor} - {server.public_ip} -
            {server.ssh_port}
            <button
              onClick={() => {
                setEditingServer(server);
                setForm({
                  ...server,
                  cpu: String(server.cpu),
                  ram: String(server.ram),
                  stock: String(server.stock),
                });
                setShowModal(true);
              }}
              className="px-4 py-2 m-2 bg-gray-700 text-white border-0 rounded cursor-pointer"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(server.id)}className="px-4 py-2 bg-red-500 text-white border-0 rounded cursor-pointer">
              Supprimer 
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <ServeurFormModal
          title={editingServer ? "Modifier le serveur" : "Ajouter un serveur"}
          formError={formError}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowModal(false);
            setEditingServer(null);
            setForm(initialForm);
          }}
        >
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
          <input
            type="number"
            placeholder="CPU (coeurs)"
            value={form.cpu}
            onChange={handleChange("cpu")}
            required
          />
          <input
            type="number"
            placeholder="RAM (Go)"
            value={form.ram}
            onChange={handleChange("ram")}
            required
          />
          <input
            type="text"
            placeholder="Sous-réseau"
            value={form.subnet}
            onChange={handleChange("subnet")}
            required
          />
          <input
            type="number"
            placeholder="Stock (Go)"
            value={form.stock}
            onChange={handleChange("stock")}
            required
          />
          <input
            type="text"
            placeholder="Hyperviseur"
            value={form.hypervisor}
            onChange={handleChange("hypervisor")}
            required
          />
          <input
            type="text"
            placeholder="IP Publique ex 185.66.234.58"
            value={form.public_ip}
            onChange={handleChange("public_ip")}
            required
          />
          <input
            type="text"
            placeholder="Port SSH"
            value={form.ssh_port}
            onChange={handleChange("ssh_port")}
            required
          />
        </ServeurFormModal>
      )}
    </section>
  );
}
