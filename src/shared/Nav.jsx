import { NavLink } from "react-router";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-logo">ASTROLOG</span>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/launches" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Launches
            </NavLink>
          </li>
          <li>
            <NavLink to="/log" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              My Log
            </NavLink>
          </li>
          <li>
            <NavLink to="/watchlist" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Watchlist
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}