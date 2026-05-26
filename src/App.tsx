import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Server from "./pages/Server";

export default function App() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <section>
              <h1> Home </h1>
            </section>
            <nav>
              <ul>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </nav>
          </header>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server" element={<Server />} />
        </Routes>
      </BrowserRouter >
    );
  }
