import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./App.css";
import Login from "./routes/Login";

export default function App() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <section>
              <h1> Début de quelque chose </h1>
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
        </Routes>
      </BrowserRouter >
    );
  }
