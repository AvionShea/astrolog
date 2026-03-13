import { useState, useEffect } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";
import Card from "../shared/Card";
import StatusBadge from "../shared/StatusBadge";
import "./Watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  function handleRemove(id) {
    const updated = removeFromWatchlist(id);
    setWatchlist(updated);
  }

  return (
    <div className="watchlist-page">
      <div className="page-header">
        <h1 className="page-title">Watchlist</h1>
        <p className="page-subtitle">{watchlist.length} saved missions</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="watchlist-empty">
          <p>No missions saved yet.</p>
          <p className="watchlist-empty-sub">
            Browse <a href="/launches">Upcoming Launches</a> and tap ☆ Watch to save them here.
          </p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <Card key={item.id} className="watchlist-card">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={`${item.rocketName} rocket`} className="watchlist-img" />
              )}
              <div className="watchlist-body">
                <StatusBadge label={item.rocketName} />
                <h3 className="watchlist-name">{item.name}</h3>
                <p className="watchlist-provider">{item.provider}</p>
                <div className="watchlist-net">
                  <span className="meta-label">NET</span>
                  <span>{item.net ? new Date(item.net).toLocaleString() : "TBD"}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}