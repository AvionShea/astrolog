import { Routes, Route } from "react-router-dom";
import Nav from "./shared/Nav";
import Dashboard from "./pages/Dashboard";
import Launches from "./pages/Launches";
import ObservationLog from "./pages/ObservationLog";
import Watchlist from "./pages/WatchList";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/log" element={<ObservationLog />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}