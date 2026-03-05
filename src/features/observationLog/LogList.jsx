import LogEntry from "./LogEntry";
import "./LogList.css";

export default function LogList({ observations, onEdit, onDelete }) {
  if (observations.length === 0) {
    return (
      <div className="log-empty">
        <p className="log-empty-title">No observations logged yet.</p>
        <p className="log-empty-sub">Add your first entry to start your sky journal.</p>
      </div>
    );
  }

  return (
    <div className="log-list">
      {observations.map((obs) => (
        <LogEntry
          key={obs.id}
          entry={obs}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}