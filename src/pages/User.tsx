import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

interface User {
  id: number;
  email: string;
  name: string;
  firstname: string;
}

export default function User() {
  const [user, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) return;
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://badger.arcplex.dev/api/v2/admin/user/me",
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
        setUsers(data);
      } catch {
        setError("Erreur de chargement");
      }
    };
    fetchUsers();
  }, [token]);
  return (
    <section>
      <h2>Liste des users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {user.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
