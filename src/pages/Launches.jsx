import { useState, useEffect, useCallback } from "react";
import { fetchUpcomingLaunches } from "../utils/api";
import LaunchList from "../features/launches/LaunchList";
import LaunchFilter from "../features/launches/LaunchFilter";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorMessage from "../shared/ErrorMessage";
import "./Launches.css";

export default function Launches() {
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadLaunches() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUpcomingLaunches(20);
        if (!cancelled) {
          setLaunches(data.results || []);
          setFiltered(data.results || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadLaunches();
    return () => { cancelled = true; };
  }, []);

  // useCallback to memoize filter handler — satisfies requirement
  const handleFilter = useCallback(
    (term) => {
      setFilterTerm(term);
      if (!term.trim()) {
        setFiltered(launches);
        return;
      }
      const lower = term.toLowerCase();
      setFiltered(
        launches.filter(
          (l) =>
            l.name?.toLowerCase().includes(lower) ||
            l.launch_service_provider?.name?.toLowerCase().includes(lower) ||
            l.rocket?.configuration?.name?.toLowerCase().includes(lower)
        )
      );
    },
    [launches]
  );

  return (
    <div className="launches-page">
      <div className="page-header">
        <h1 className="page-title">Upcoming Launches</h1>
        <p className="page-subtitle">
          {loading ? "" : `${filtered.length} missions on manifest`}
        </p>
      </div>
      <LaunchFilter value={filterTerm} onChange={handleFilter} />
      {loading && <LoadingSpinner message="Fetching launch manifest..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <LaunchList launches={filtered} />}
    </div>
  );
}