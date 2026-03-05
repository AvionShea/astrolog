import LaunchCard from "./LaunchCard";
import "./LaunchList.css";

export default function LaunchList({ launches }) {
  if (launches.length === 0) {
    return (
      <div className="launch-empty">
        <p>No missions match your search.</p>
      </div>
    );
  }

  return (
    <div className="launch-list">
      {launches.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </div>
  );
}