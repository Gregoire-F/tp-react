import { useNavigate } from "react-router";
export function LogOut(props: any) {
  const navigate = useNavigate();

  const logout = () => {
    props.setLogged(false);
    props.setUser(null);
    navigate("/");
  };

  if (props.logged) {
    return (
      <div>
        <p>
          Hello {props.user}
          <button onClick={logout}>Logout</button>
        </p>
      </div>
    );
  }
}
