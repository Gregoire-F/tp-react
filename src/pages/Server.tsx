import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApiCall } from "../lib/api";

interface Server {
  id: number;
  name: string;
  cpu: number;
  ram: number;
  os: string;
  subnet: string;
  stock: number;
}

interface ServerForm {
  name: string;
  cpu: string;
  ram: string;
  os: string;
  subnet: string;
  stock: string;
}

const initialForm: ServerForm = {
  name: "", cpu: "", ram: "", os: "", subnet: "", stock: "",
};

export default function Server() {
  const { data: servers, error, execute } = useApiCall<Server[]>();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ServerForm>(initialForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    execute("GET", "admin/server/me");
  }, [execute]);

  const handleChange = (field: keyof ServerForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    try {
      await execute("POST", "admin/server", {
        name: form.name,
        cpu: String(form.cpu),
        ram: String(form.ram),
        os: form.os,
        subnet: form.subnet,
        stock: Number(form.stock),
      });
      setShowModal(false);
      setForm(initialForm);
      await execute("GET", "admin/server/me");
    } catch {
      setFormError("Erreur lors de l'ajout du serveur");
    }
  };

  const fields: { key: keyof ServerForm; label: string; type?: string }[] = [
    { key: "name", label: "Nom" },
    { key: "cpu", label: "CPU (coeurs)", type: "number" },
    { key: "ram", label: "RAM (Go)", type: "number" },
    { key: "os", label: "OS" },
    { key: "subnet", label: "Sous-réseau" },
    { key: "stock", label: "Stock (Go)", type: "number" },
  ];

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
            {server.name} -{server.cpu} coeurs -{server.ram} Go -{server.subnet}{" "}
            -{server.os}
            {server.stock} Go
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg min-w-80 flex flex-col gap-3"
          >
            <h3>Ajouter un serveur</h3>
            {formError && (
              <p className="margin-0 text-red-500">{formError}</p>
            )}
            {fields.map(({ key, label, type }) => (
              <input
                key={key}
                type={type ?? "text"}
                value={form[key]}
                onChange={handleChange(key)}
                placeholder={label}
                required
              />
            ))}
            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer"
              >
                Ajouter
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 border-0 rounded cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
