import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApiCall } from "../lib/api";
import FormModal from "../components/FormModal";
import { useCanDelete, useCanEdit } from "../lib/access";
import { useAppSelector } from "../store/store";

interface Vm {
  id: number;
  name: string;
  os: string;
  cpu: number;
  ram: number;
  stock: number;
  server: { id: number; name: string } | string;
  private_ip: string;
  public_ip: string;
  ssh_port: string;
}

interface ServerOption {
  id: number;
  name: string;
}
interface VmForm {
  name: string;
  os: string;
  cpu: string;
  ram: string;
  stock: string;
  server: string;
  private_ip: string;
  public_ip: string;
  ssh_port: string;
}

const initialForm: VmForm = {
  name: "",
  os: "",
  cpu: "",
  ram: "",
  stock: "",
  server: "",
  private_ip: "",
  public_ip: "",
  ssh_port: "",
};

export default function Vm() {
  const canDelete = useCanDelete("vm");
  const canEdit = useCanEdit("vm");
  const { user: authUser } = useAppSelector((store) => store.auth);
  const role = authUser?.user.roles[0];

  const { data: vm, error, execute } = useApiCall<Vm[]>();
  const { data: servers, execute: fetchServers } = useApiCall<ServerOption[]>();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<VmForm>(initialForm);
  const [editingVm, setEditingVm] = useState<Vm | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    execute("GET", "admin/vm/me");
    if (role === "ROLE_SUPER_ADMIN" || role === "ROLE_DEVELOPER") {
      fetchServers("GET", "admin/server/me");
    }
  }, [execute, fetchServers, role]);

  const handleChange =
    (field: keyof VmForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const body: any = {
      name: form.name,
      os: form.os,
      cpu: Number(form.cpu),
      ram: Number(form.ram),
      stock: Number(form.stock),
      private_ip: form.private_ip,
      public_ip: form.public_ip,
      ssh_port: form.ssh_port,
    };
    if (form.server) body.server = form.server;
    try {
      if (editingVm) {
        await execute("PATCH", `admin/vm/${editingVm.id}`, body);
      } else {
        await execute("POST", "admin/vm", body);
      }
      setShowModal(false);
      setEditingVm(null);
      setForm(initialForm);
      await execute("GET", "admin/vm/me");
    } catch {
      setFormError(
        editingVm
          ? "Erreur lors de la modification de la VM"
          : "Erreur lors de l'ajout de la VM",
      );
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette VM ?")) return;
    try {
      await execute("DELETE", `admin/vm/${id}`);
      await execute("GET", "admin/vm/me");
    } catch {
      setFormError("Erreur lors de la suppression");
    }
  };
  return (
    <section className="flex justify-center flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl bg-gray-300 px-4 py-2">
          Liste des VM
        </h2>
        {canEdit(vm) && (
          <button
            className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Ajouter une VM
          </button>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(vm ?? []).map((vm) => (
          <li key={vm.id}>
            {vm.name} -{vm.os} - {vm.cpu} Go -{vm.ram} Go -{vm.stock} -{" "}
            {vm.private_ip} - {vm.public_ip} -{" "}
            {typeof vm.server === "object" ? vm.server.name : vm.server}
            {vm.ssh_port}
            {canEdit(vm) && (
              <button
                onClick={() => {
                  setEditingVm(vm);
                  setForm({
                    ...vm,
                    cpu: String(vm.cpu),
                    ram: String(vm.ram),
                    stock: String(vm.stock),
                    server: typeof vm.server === "object" ? String(vm.server.id) : vm.server,
                  });
                  setShowModal(true);
                }}
                className="px-4 py-2 m-2 bg-gray-700 text-white border-0 rounded cursor-pointer"
              >
                Edit
              </button>
            )}
            {canDelete(vm) && (<button
              onClick={() => handleDelete(vm.id)}
              className="px-4 py-2 bg-red-500 text-white border-0 rounded cursor-pointer"
            >
              Supprimer
            </button>
          )}
          </li>
        ))}
      </ul>
      {showModal && (
        <FormModal
          title={editingVm ? "Modifier la VM" : "Ajouter une VM"}
          formError={formError}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowModal(false);
            setEditingVm(null);
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
            placeholder="OS"
            value={form.os}
            onChange={handleChange("os")}
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
            placeholder="IP Privée"
            value={form.private_ip}
            onChange={handleChange("private_ip")}
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
          <select
            value={form.server}
            onChange={handleChange("server")}
            required
            className="border p-2 rounded"
          >
            <option value="">Sélectionner un serveur</option>
            {(servers ?? []).map((srv) => (
              <option key={srv.id} value={String(srv.id)}>
                {srv.name}
              </option>
            ))}
          </select>
        </FormModal>
      )}
    </section>
  );
}
