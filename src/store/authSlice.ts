import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: JwtI | null;
}

export interface JwtI {
  iat: number;
  exp: number;
  user: User;
}

export interface User {
  id: number;
  email: string;
  name: string;
  firstname: string;
  ip_address: string;
  creation_date: string;
  create_by: string;
  last_connexion: string;
  active: boolean;
  roles: string[];
  ssh_user: string;
  team: Team;
}

export interface Team {
  id: number;
  name: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("token") ? parseJwt(localStorage.getItem("token")!) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; user: string }>,
    ) {
      state.token = action.payload.token;
      state.user = parseJwt (action.payload.token);
      // Ajout ici pour gestion du localStorage avec Redux et hook useAppSelector dans les pages
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

function parseJwt(jwt: string): JwtI {
  return JSON.parse(atob(jwt.split(".")[1]));
}
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
