import Card from "../../shared/Card";
import StatusBadge from "../../shared/StatusBadge";
import "./LogEntry.css";

function ratingStars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

export default function LogEntry({ entry, onEdit, onDelete }) {
  return (
    <Card className="log-entry">
      <div className="entry-header">
        <div className="entry-meta-top">
          <StatusBadge label={entry.type} />
          <span className="entry-date">{entry.date}</span>
        </div>
        <div className="entry-actions">
          <button className="entry-btn" onClick={() => onEdit(entry)}>Edit</button>
          <button
            className="entry-btn entry-btn-danger"
            onClick={() => onDelete(entry.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <h3 className="entry-title">{entry.title}</h3>

      <p className="entry-notes">{entry.notes}</p>

      <div className="entry-footer">
        <span className="entry-stars">{ratingStars(entry.rating)}</span>
        {entry.weather && <span className="entry-detail">{entry.weather}</span>}
        {entry.location && <span className="entry-detail">📍 {entry.location}</span>}
      </div>
    </Card>
  );
}