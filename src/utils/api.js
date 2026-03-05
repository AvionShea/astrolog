const NASA_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

export async function fetchAPOD() {
    const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
    );
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`);
    return res.json();
}

export async function fetchUpcomingLaunches(limit = 10, offset = 0) {
    const res = await fetch(
        `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}&mode=detailed`
    );
    if (!res.ok) throw new Error(`Launch Library error: ${res.status}`);
    return res.json();
}

export async function fetchISSLocation() {
    const res = await fetch("http://api.open-notify.org/iss-now.json");
    if (!res.ok) throw new Error(`ISS API error: ${res.status}`);
    return res.json();
}

export async function fetchAstronauts() {
    const res = await fetch("http://api.open-notify.org/astros.json");
    if (!res.ok) throw new Error(`Astronaut API error: ${res.status}`);
    return res.json();
}