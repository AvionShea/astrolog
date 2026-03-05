import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Signal Lost</h1>
      <p className="not-found-sub">
        This sector of space is uncharted. The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="not-found-link">Return to Mission Control</Link>
    </div>
  );
}