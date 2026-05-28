import { Link } from "react-router";
export default function Dashboard() {
  return (
    <section>
      <h2>Bienvenue sur le dashboard</h2>
      <Link to="/server">Liste des serveurs</Link>
      <Link to="/vm">Liste des Vm</Link>
      <Link to="/user">Liste des users</Link>
      <Link to="/client">Liste des clients</Link>
      <Link to="/service">Liste des services</Link>
      <button className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 cursor-pointer text-white">Se déconnecter</button>
    </section>
  );
}