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
    </section>
  );
}