import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Server from "./pages/Server";
import Vm from "./pages/Vm";
import User from "./pages/User";
import Client from "./pages/Client";
import Service from "./pages/Service";

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server" element={<Server />} />
          <Route path="/vm" element={<Vm />} />
          <Route path="/user" element={<User />} />
          <Route path="/client" element={<Client />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </BrowserRouter >
    );
  }
