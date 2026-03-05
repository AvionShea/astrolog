import "./LaunchFilter.css";

export default function LaunchFilter({ value, onChange }) {
  return (
    <div className="launch-filter">
      <label htmlFor="launch-search" className="filter-label">
        Search missions
      </label>
      <input
        id="launch-search"
        type="text"
        className="filter-input"
        placeholder="Rocket name, provider, mission..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}