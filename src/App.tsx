import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Server from "./pages/Server";
import Vm from "./pages/Vm";
import User from "./pages/User";
import Client from "./pages/Client";
import Service from "./pages/Service";
import NeedAuth from "./components/NeedAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<NeedAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server/me" element={<Server />} />
          <Route path="/vm/me" element={<Vm />} />
          <Route path="/user/me" element={<User />} />
          <Route path="/client/me" element={<Client />} />
          <Route path="/service/me" element={<Service />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
