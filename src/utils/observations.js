/**
 * AstroLog Data Schema & localStorage utilities
 *
 * Observation Entry Schema:
 * {
 *   id: string,          // crypto.randomUUID()
 *   title: string,       // required, min 3 chars — what did you observe?
 *   date: string,        // required — ISO date string (YYYY-MM-DD)
 *   type: string,        // required — one of OBSERVATION_TYPES
 *   notes: string,       // required, min 10 chars — observation details
 *   rating: number,      // 1–5 — how good was the viewing?
 *   weather: string,     // one of WEATHER_CONDITIONS
 *   location: string,    // optional — where were you?
 *   createdAt: string,   // ISO timestamp, set on creation
 *   updatedAt: string,   // ISO timestamp, updated on edit
 * }
 */

const STORAGE_KEY = "astrolog_observations";

export const OBSERVATION_TYPES = [
    "Planet",
    "Star",
    "Meteor Shower",
    "ISS Pass",
    "Lunar",
    "Deep Sky Object",
    "Satellite",
    "Other",
];

export const WEATHER_CONDITIONS = [
    "Clear",
    "Partly Cloudy",
    "Overcast",
    "Humid",
    "Windy",
];

export function getObservations() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveObservations(observations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
}

export function addObservation(entry) {
    const observations = getObservations();
    const newEntry = {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    saveObservations([newEntry, ...observations]);
    return newEntry;
}

export function updateObservation(id, updates) {
    const observations = getObservations();
    const updated = observations.map((obs) =>
        obs.id === id
            ? { ...obs, ...updates, updatedAt: new Date().toISOString() }
            : obs
    );
    saveObservations(updated);
    return updated;
}

export function deleteObservation(id) {
    const observations = getObservations();
    const filtered = observations.filter((obs) => obs.id !== id);
    saveObservations(filtered);
    return filtered;
}