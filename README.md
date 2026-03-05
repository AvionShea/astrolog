# AstroLog 🛰️

A personal space mission tracker and sky-watching journal. Browse real-time rocket launches, explore NASA's Astronomy Picture of the Day, track the ISS, and log your own astronomical observations.

---

## Features

- **Dashboard** — NASA APOD hero image, live ISS location snapshot, next launch countdown
- **Launches** — Browse and filter upcoming rocket launches from Launch Library 2
- **Observation Log** — Personal CRUD journal of sky-watching sessions (persisted to localStorage)
- **Watchlist** — Saved launches and events

---

## Dependencies

| Package        | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `react-router` | Client-side routing (BrowserRouter, Routes, NavLink) |

No libraries that directly manipulate the DOM are used in this project.

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AvionShea/astrolog.git
cd astrolog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and add your NASA API key:

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and fill in your key.

### 4. Run the dev server

```bash
npm run dev
```

---

## API Connections

### NASA APOD

- **URL**: `https://api.nasa.gov/planetary/apod`
- **Auth**: Free API key required
- **Sign up**: https://api.nasa.gov/ (instant, no credit card)
- **Env var**: `VITE_NASA_API_KEY`

### Launch Library 2

- **URL**: `https://ll.thespacedevs.com/2.2.0/`
- **Auth**: None required for basic use (rate limited to ~15 req/hour on free tier)
- **Env var**: None needed

### Open Notify (ISS)

- **URL**: `http://api.open-notify.org/`
- **Auth**: None required
- **Env var**: None needed

---

## Data Persistence

Observation log entries are saved to `localStorage` under the key `astrolog_observations`. No backend required.

---

## Environment Variables

See `.env.local.example` for all required variables.
