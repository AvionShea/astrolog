import { useState, useEffect } from "react";
import { fetchAPOD, fetchISSLocation, fetchAstronauts } from "../utils/api";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import Card from "../shared/Card";
import "./Dashboard.css";

export default function Dashboard() {
  const [apod, setApod] = useState(null);
  const [iss, setIss] = useState(null);
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial load — fetches APOD and astronauts once
useEffect(() => {
  let cancelled = false;

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);
      const [apodData, astroData] = await Promise.all([
        fetchAPOD(),
        fetchAstronauts(),
      ]);
      if (!cancelled) {
        setApod(apodData);
        setAstronauts(astroData.people || []);
      }
    } catch (err) {
      if (!cancelled) setError(err.message);
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  loadDashboard();
  return () => { cancelled = true; };
}, []);

// ISS polling — updates every 5 seconds, cleanup clears the interval
useEffect(() => {
  async function updateISS() {
    try {
      const issData = await fetchISSLocation();
      setIss(issData);
    } catch {
      // silently fail on polling errors — don't disrupt the whole page
    }
  }

  updateISS();
  const interval = setInterval(updateISS, 5000);

  return () => clearInterval(interval);
}, []);

  if (loading) return <LoadingSpinner message="Syncing with mission control..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="dashboard">
      {/* APOD Hero */}
      {apod && (
        <section className="apod-hero">
          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} className="apod-image" />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              className="apod-video"
              allowFullScreen
            />
          )}
          <div className="apod-overlay">
            <p className="apod-label">Astronomy Picture of the Day</p>
            <h1 className="apod-title">{apod.title}</h1>
            <p className="apod-date">{apod.date}</p>
          </div>
        </section>
      )}

      <div className="dashboard-grid">
        {/* ISS Location */}
        {iss && (
          <Card>
            <h2 className="card-heading">ISS Location</h2>
            <div className="iss-coords">
              <div>
                <span className="coord-label">Latitude</span>
                <span className="coord-value">{parseFloat(iss.iss_position.latitude).toFixed(4)}°</span>
              </div>
              <div>
                <span className="coord-label">Longitude</span>
                <span className="coord-value">{parseFloat(iss.iss_position.longitude).toFixed(4)}°</span>
              </div>
            </div>
          </Card>
        )}

        {/* Crew */}
        <Card>
          <h2 className="card-heading">Currently in Space</h2>
          <p className="crew-count">{astronauts.length} <span>people aboard</span></p>
          <ul className="crew-list">
            {astronauts.map((person) => (
              <li key={person.name} className="crew-member">
                <span className="crew-dot" />
                {person.name}
              </li>
            ))}
          </ul>
        </Card>

        {/* APOD explanation */}
        {apod && (
          <Card className="apod-explanation-card">
            <h2 className="card-heading">About Today's Image</h2>
            <p className="apod-explanation">{apod.explanation}</p>
            {apod.copyright && (
              <p className="apod-credit">© {apod.copyright}</p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}