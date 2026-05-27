import { useEffect } from "react";
import { useApiCall } from "../lib/api";

interface User {
  id: number;
  email: string;
  name: string;
  firstname: string;
}

export default function User() {
  const { data: user, error, execute } = useApiCall<User[]>();
  useEffect(() => {
    execute("GET", "admin/user/me");
  }, [execute]);
  return (
    <section>
      <h2>Liste des users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {(user ?? []).map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
