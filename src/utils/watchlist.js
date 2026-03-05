/**
 * Watchlist utilities — saves launch IDs + metadata to localStorage
 *
 * Watchlist Item Schema:
 * {
 *   id: string,          // launch ID from Launch Library 2
 *   name: string,        // launch name
 *   net: string,         // NET (No Earlier Than) launch time ISO string
 *   provider: string,    // launch service provider name
 *   rocketName: string,  // rocket configuration name
 *   imageUrl: string,    // launch image URL
 *   savedAt: string,     // ISO timestamp when user saved it
 * }
 */

const STORAGE_KEY = "astrolog_watchlist";

export function getWatchlist() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function isOnWatchlist(id) {
    return getWatchlist().some((item) => item.id === id);
}

export function addToWatchlist(launch) {
    const watchlist = getWatchlist();
    if (isOnWatchlist(launch.id)) return watchlist;
    const updated = [{ ...launch, savedAt: new Date().toISOString() }, ...watchlist];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function removeFromWatchlist(id) {
    const updated = getWatchlist().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
}