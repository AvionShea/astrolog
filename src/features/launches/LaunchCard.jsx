import { useState } from "react";
import Card from "../../shared/Card";
import StatusBadge from "../../shared/StatusBadge";
import { addToWatchlist, removeFromWatchlist, isOnWatchlist } from "../../utils/watchlist";
import "./LaunchCard.css";

function getStatusVariant(status) {
  const name = status?.abbrev || "";
  if (name === "Go") return "success";
  if (name === "TBD" || name === "TBC") return "warning";
  if (name === "Hold") return "danger";
  return "default";
}

export default function LaunchCard({ launch }) {
  const [saved, setSaved] = useState(() => isOnWatchlist(launch.id));

  const provider = launch.launch_service_provider?.name || "Unknown provider";
  const rocket = launch.rocket?.configuration?.name || "Unknown rocket";
  const net = launch.net ? new Date(launch.net).toLocaleString() : "TBD";
  const statusLabel = launch.status?.name || "Unknown";
  const statusVariant = getStatusVariant(launch.status);
  const image = launch.image || launch.rocket?.configuration?.image_url;

  function handleWatchlistToggle() {
    if (saved) {
      removeFromWatchlist(launch.id);
      setSaved(false);
    } else {
      addToWatchlist({
        id: launch.id,
        name: launch.name,
        net: launch.net,
        provider,
        rocketName: rocket,
        imageUrl: image,
      });
      setSaved(true);
    }
  }

  return (
    <Card>
      {image && (
        <img
          src={image}
          alt={`${rocket} rocket`}
          className="launch-image"
        />
      )}
      <div className="launch-card-body">
        <div className="launch-card-top">
          <StatusBadge label={statusLabel} variant={statusVariant} />
          <button
            className={`watchlist-btn ${saved ? "watchlist-btn-saved" : ""}`}
            onClick={handleWatchlistToggle}
            aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
          >
            {saved ? "★ Saved" : "☆ Watch"}
          </button>
        </div>
        <h3 className="launch-name">{launch.name}</h3>
        <p className="launch-provider">{provider}</p>
        <div className="launch-meta">
          <div>
            <span className="meta-label">Rocket</span>
            <span className="meta-value">{rocket}</span>
          </div>
          <div>
            <span className="meta-label">NET</span>
            <span className="meta-value">{net}</span>
          </div>
          {launch.pad?.location?.name && (
            <div>
              <span className="meta-label">Location</span>
              <span className="meta-value">{launch.pad.location.name}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}