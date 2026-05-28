import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useApiCall } from "../lib/api";
import FormModal from "../components/FormModal";

interface User {
  id: number;
  email: string;
  name: string;
  firstname: string;
  ip_address: string;
  roles: string;
}
interface UserForm {
  email: string;
  name: string;
  firstname: string;
  roles: string;
  ip_address: string;
  plain_password?: string;
}

const initialForm: UserForm = {
  name: "",
  email: "",
  firstname: "",
  roles: "",
  ip_address: "",
};
export default function User() {
  const { data: user, error, execute } = useApiCall<User[]>();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<UserForm>(initialForm);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    execute("GET", "admin/user/me");
  }, [execute]);

  const handleChange =
    (field: keyof UserForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const body = { ... form,
      roles: form.roles ? [form.roles] : [],

    };
    try {
      if (editingUser) {
        await execute("PATCH", `admin/user/${editingUser.id}`, body);
      } else {
        await execute("POST", "admin/user", body);
      }
      setShowModal(false);
      setEditingUser(null);
      setForm(initialForm);
      await execute("GET", "admin/user/me");
    } catch {
      setFormError(
        editingUser
          ? "Erreur lors de la modification du user"
          : "Erreur lors de l'ajout d'un user",
      );
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce user ?")) return;
    try {
      await execute("DELETE", `admin/user/${id}`);
      await execute("GET", "admin/user/me");
    } catch {
      setFormError("Erreur lors de la suppression");
    }
  };
  return (
    <section className="flex justify-center flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl bg-gray-300 px-4 py-2">
          Liste des users
        </h2>
        <button
          className="px-4 py-2 bg-black text-white border-0 rounded cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Ajouter un user
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {Array.isArray(user) && user.map((user) => (
          <li key={user.id}>
            {user.name} -{user.firstname} -{user.email} - {Array.isArray(user.roles) ? user.roles[0] : user.roles}
            <button
              onClick={() => {
                setEditingUser(user);
                setForm({
                  ...user,
                  roles: Array.isArray(user.roles) ? user.roles[0] ?? "" : user.roles,
                });
                setShowModal(true);
              }}
              className="px-4 py-2 m-2 bg-gray-700 text-white border-0 rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="px-4 py-2 bg-red-500 text-white border-0 rounded cursor-pointer"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <FormModal
          title={editingUser ? "Modifier l'user" : "Ajouter un User"}
          formError={formError}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowModal(false);
            setEditingUser(null);
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
            type="string"
            placeholder="Prénom"
            value={form.firstname}
            onChange={handleChange("firstname")}
            required
          />
          <input
            type="string"
            placeholder="email"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
          <input
            type="string"
            placeholder="ip_adress"
            value={form.ip_address}
            onChange={handleChange("ip_address")}
          />
          <input
            type="string"
            placeholder="password"
            value={form.plain_password}
            onChange={handleChange("plain_password")}
          />
          <select
            value={form.roles}
            onChange={handleChange("roles")}
            required
            className="border p-2 rounded"
          >
            <option value="">Sélectionner un rôle</option>
            <option value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</option>
            <option value="ROLE_ADMIN">ROLE_CLIENT_ADMIN</option>
            <option value="ROLE_DEVELOPER">ROLE_DEVELOPER</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>
        </FormModal>
      )}
    </section>
  );
}
