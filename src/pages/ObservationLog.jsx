import { useState, useEffect } from "react";
import LogForm from "../features/observationLog/LogForm";
import LogList from "../features/observationLog/LogList";
import {
  getObservations,
  addObservation,
  updateObservation,
  deleteObservation,
} from "../utils/observations";
import "./ObservationLog.css";

export default function ObservationLog() {
  const [observations, setObservations] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setObservations(getObservations());
  }, []);

  function handleAdd(formData) {
    const newEntry = addObservation(formData);
    setObservations((prev) => [newEntry, ...prev]);
    setShowForm(false);
  }

  function handleUpdate(formData) {
    const updated = updateObservation(editingEntry.id, formData);
    setObservations(updated);
    setEditingEntry(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    const updated = deleteObservation(id);
    setObservations(updated);
  }

  function handleEdit(entry) {
    setEditingEntry(entry);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingEntry(null);
    setShowForm(false);
  }

  return (
    <div className="log-page">
      <div className="log-header">
        <div>
          <h1 className="page-title">Observation Log</h1>
          <p className="page-subtitle">{observations.length} entries recorded</p>
        </div>
        {!showForm && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + New Entry
          </button>
        )}
      </div>

      {showForm && (
        <LogForm
          initialData={editingEntry}
          onSubmit={editingEntry ? handleUpdate : handleAdd}
          onCancel={handleCancel}
        />
      )}

      <LogList
        observations={observations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}