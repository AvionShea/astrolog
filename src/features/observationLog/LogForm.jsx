import { useState } from "react";
import Card from "../../shared/Card";
import { OBSERVATION_TYPES, WEATHER_CONDITIONS } from "../../utils/observations";
import "./LogForm.css";

const EMPTY_FORM = {
  title: "",
  date: "",
  type: "",
  notes: "",
  rating: 3,
  weather: "",
  location: "",
};

function validate(fields) {
  const errors = {};
  if (!fields.title || fields.title.trim().length < 3)
    errors.title = "Title must be at least 3 characters.";
  if (!fields.date) errors.date = "Date is required.";
  if (!fields.type) errors.type = "Please select an observation type.";
  if (!fields.notes || fields.notes.trim().length < 10)
    errors.notes = "Notes must be at least 10 characters.";
  return errors;
}

export default function LogForm({ initialData, onSubmit, onCancel }) {
  const [fields, setFields] = useState(
    initialData
      ? {
          title: initialData.title,
          date: initialData.date,
          type: initialData.type,
          notes: initialData.notes,
          rating: initialData.rating,
          weather: initialData.weather || "",
          location: initialData.location || "",
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...fields, [name]: value }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(fields));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(fields).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(fields);
  }

  return (
    <Card className="log-form-card">
      <h2 className="form-title">
        {initialData ? "Edit Entry" : "New Observation"}
      </h2>
      <form onSubmit={handleSubmit} className="log-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={fields.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="What did you observe?"
              className={errors.title && touched.title ? "input-error" : ""}
            />
            {errors.title && touched.title && (
              <span className="error-msg">{errors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={fields.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.date && touched.date ? "input-error" : ""}
            />
            {errors.date && touched.date && (
              <span className="error-msg">{errors.date}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={fields.type}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.type && touched.type ? "input-error" : ""}
            >
              <option value="">Select type...</option>
              {OBSERVATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && touched.type && (
              <span className="error-msg">{errors.type}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="weather">Weather</label>
            <select id="weather" name="weather" value={fields.weather} onChange={handleChange}>
              <option value="">Select conditions...</option>
              {WEATHER_CONDITIONS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={fields.location}
            onChange={handleChange}
            placeholder="Where were you? (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">
            Rating: {fields.rating}/5
          </label>
          <input
            id="rating"
            name="rating"
            type="range"
            min="1"
            max="5"
            value={fields.rating}
            onChange={handleChange}
            className="rating-slider"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes *</label>
          <textarea
            id="notes"
            name="notes"
            value={fields.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            placeholder="Describe what you saw, conditions, equipment used..."
            className={errors.notes && touched.notes ? "input-error" : ""}
          />
          {errors.notes && touched.notes && (
            <span className="error-msg">{errors.notes}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {initialData ? "Save Changes" : "Log Observation"}
          </button>
        </div>
      </form>
    </Card>
  );
}