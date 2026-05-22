import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/authSlice";

export function LogOut() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!token) return null;

  return (
    <div>
      <p>
        Hello {user}
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}
