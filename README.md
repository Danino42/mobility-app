# Mobility App — Trusted EV Fleet Charging

BKW Challenge — UZH Innovathon 2026 (supported by pi-System)

A mobile-first driver app for transparent, fair and cost-efficient EV
fleet charging — home, workplace and public — without feeling like
surveillance. Companies get accounts for their drivers; drivers see
their route, the best charging stops (some with meal deals or coffee
perks), and how their company ranks against others.

## Stack

- **Frontend:** React + TypeScript (Vite), Tailwind CSS, React Router,
  Google Maps (`@vis.gl/react-google-maps`)
- **Backend:** FastAPI (Python), Motor (async MongoDB driver) — scaffolded,
  not yet wired to the mobile UI (which currently runs on mock data)
- **Database:** MongoDB (Atlas free tier recommended)
- **Deployment:** Frontend → Vercel, Backend → Render

## Project structure

```
.
├── frontend/          # React + TS mobile-first app
│   └── src/
│       ├── components/
│       │   ├── layout/        # AppShell, Header, Sidebar
│       │   ├── GoogleMapView.tsx
│       │   ├── ChargerCard.tsx
│       │   └── PerkBadge.tsx
│       ├── pages/       # Login, MapAndChargers, MyRoutes, Leaderboard
│       ├── images/      # charger.png, carback.png, mealdeal.jpg, coffee.png
│       ├── mock/         # mock/data.ts — all sample data lives here
│       └── types/         # shared domain types
└── backend/           # FastAPI app (scaffolded for later integration)
    └── app/
        ├── routers/    # /fleet/summary, /charging-events, /fairness
        ├── models/     # pydantic models
        ├── db/         # Mongo client
        └── mock_data.py
```

## Local development

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# edit .env.local: add your Google Maps API key (see below)
npm run dev
```

App: http://localhost:5173

### Google Maps setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis).
2. Create a project (or use an existing one).
3. Enable **Maps JavaScript API**.
4. Under APIs & Services → Credentials, create an API key.
5. Restrict it: "Application restrictions" → HTTP referrers →
   add `http://localhost:5173/*` for dev and your Vercel domain
   (e.g. `https://mobility-app-*.vercel.app/*`) once deployed.
6. Put the key in `frontend/.env.local`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your-key-here
   ```
7. Also add a **Map ID** if you want cloud-based map styling later — for
   now the app uses `mapId="fleet-charging-map"` as a placeholder; a
   default/unstyled map works fine without configuring an actual Map ID
   in the console.

Google's Maps JavaScript API requires a billing account on the Google
Cloud project, but the free monthly credit comfortably covers a
hackathon demo.

### Backend (optional for now)

The mobile app currently runs entirely on mock data
(`frontend/src/mock/data.ts`) and does not call the backend. The FastAPI
scaffold is kept for when you're ready to wire up real persistence:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Deployment

### Frontend → Vercel

1. Push this repo to GitHub.
2. On [Vercel](https://vercel.com), import the repo, root directory
   `frontend`.
3. Framework preset: Vite (auto-detected).
4. Add env var `VITE_GOOGLE_MAPS_API_KEY` = your Google Maps key.
5. If/when the backend is wired up, also add `VITE_API_BASE_URL`.
6. Deploy.

### Backend → Render (when needed)

1. On [Render](https://render.com), "New Web Service" → connect the repo,
   root directory `backend`.
2. Render picks up `render.yaml`, or set manually:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Set env vars: `MONGODB_URI` (Atlas connection string), `CORS_ORIGINS`
   (your Vercel URL).

## Design

Light mode, red accent (`#C8382A`) on a warm off-white background
(`#FAF6F4`), flat surfaces with hairline borders — no shadows or
gradients. Tokens live in `frontend/src/index.css` (`@theme` block).

Screens:
- **Login** — company-issued account, visual only (no backend auth yet)
- **Map & chargers** — today's route on a live Google Map; charger pins
  use `charger.png`, meal-deal stops use `mealdeal.jpg`; tapping a pin
  shows price, availability and meal-deal details (free/discounted %,
  vegan) in an info window. Below the map, the same stops are grouped
  into Optimal / Still OK / Higher cost lists.
- **My routes** — upcoming planned trips with distance, status, and the
  charger stops tied to each route.
- **Leaderboard** — companies ranked by efficiency score, monthly prize
  banner, own company highlighted.

## Domain model

Three charging realities per the challenge brief: home, workplace,
public. Core types live in `frontend/src/types/domain.ts`:
`DriverSession`, `ChargerStop` (with optional `MealDealDetail` — free or
discounted %, vegan flag), `PlannedRoute`, `CompanyRankingEntry`.

Mock charger coordinates sit along a real Bern-area commute corridor
(BKW HQ, Wankdorf, Grauholz, Muri, Bern-Ost) so the map looks grounded
rather than randomly scattered — swap these for real station data as
it becomes available.

## Next steps

- [ ] Wire the frontend to the FastAPI backend + MongoDB instead of mock data
- [ ] Real authentication (currently a visual-only login)
- [ ] Route line/polyline between stops on the map (Directions API)
- [ ] Data & trust concept page (what's collected, why, granularity)
- [ ] Fairness/savings calculation logic
