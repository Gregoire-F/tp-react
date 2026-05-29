import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section>
      <h2>Bienvenue sur le dashboard</h2>
      <Link to="/server/me">Liste des serveurs</Link>
      <Link to="/vm/me">Liste des Vm</Link>
      <Link to="/user/me">Liste des users</Link>
      <Link to="/client/me">Liste des clients</Link>
      <Link to="/service/me">Liste des services</Link>
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 cursor-pointer text-white"
      >
        Se déconnecter
      </button>
    </section>
  );
}
