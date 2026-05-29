import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <header>
      <nav className="border-slate-200 h-30">
        <h2 className="text-center text-2xl mb-6">Bienvenue sur le dashboard Badger</h2>
        <div className="text-l flex justify-center flex-wrap items-center mx-auto max-w-7-xl px-6">
          <div className="flex gap-6">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
