import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../store/store";
import { setCredentials } from "../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if(!res.ok){
        setError("Erreur dans les identifiants !");
        return
      }

      const data = await res.json();
      dispatch(setCredentials({ token: data.jwt, user: email }));
      navigate("/dashboard");
    } catch (err) {"Erreur dans les identifiants !"}
  };

  return (
    <>
      <main className="relative bg-slate-50 dark:bg-slate-950 h-svh flex flex-col justify-center items-center">
        <div className="px-14 md:px-24 py-14 rounded border border-slate-300 bg-white dark:bg-slate-900 items-center justify-center flex flex-row gap-16">
          <h1 className="font-semibold text-xl">Bienvenue sur Badger</h1>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <h2 className="font-bold text-amber-500 border-b border-amber-500">
              Se connecter
            </h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              className="border-2 rounded outline-amber-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="border-2 rounded outline-amber-500"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="py-2 px-4 bg-black text-white rounded-lg cursor-pointer"
            >
              Se connecter
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
