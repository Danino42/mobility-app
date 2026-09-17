# Trusted EV Fleet Charging

BKW Challenge — UZH Innovathon 2026 (supported by pi-System)

A concept + prototype for making EV fleet charging transparent, fair and
cost-efficient across home, workplace and public charging — without feeling
like surveillance.

## Stack

- **Frontend:** React + TypeScript (Vite), Tailwind CSS, React Router, Recharts
- **Backend:** FastAPI (Python), Motor (async MongoDB driver)
- **Database:** MongoDB (Atlas free tier recommended)
- **Deployment:** Frontend → Vercel, Backend → Render

## Project structure

```
.
├── frontend/          # React + TS app
│   └── src/
│       ├── api/       # axios client + typed API calls
│       ├── components/
│       ├── pages/      # FleetDashboard, DriverView
│       └── types/       # shared domain types
└── backend/           # FastAPI app
    └── app/
        ├── routers/    # /fleet/summary, /charging-events, /fairness
        ├── models/     # pydantic models mirroring frontend types
        ├── db/         # Mongo client
        └── mock_data.py # seed data used until Mongo is populated
```

## Local development

### 1. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # adjust MONGODB_URI if using Atlas
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

The API currently serves **mock data** (see `app/mock_data.py`) so the
frontend has something to render immediately. Swap in real MongoDB
queries in `app/routers/fleet.py` as the data model solidifies.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173 — API calls to `/api/*` are proxied to the
backend on port 8000 (see `vite.config.ts`).

### 3. MongoDB

Easiest for a 2-day hackathon: create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
cluster, get the connection string, and put it in `backend/.env` as
`MONGODB_URI`. Alternatively run Mongo locally with Docker:

```bash
docker run -d -p 27017:27017 --name mongo mongo:7
```

## Deployment

### Backend → Render

1. Push this repo to GitHub.
2. On [Render](https://render.com), "New Web Service" → connect the repo,
   root directory `backend`.
3. Render will pick up `render.yaml` (or set manually):
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set env vars: `MONGODB_URI` (Atlas connection string), `CORS_ORIGINS`
   (your Vercel URL once deployed).

### Frontend → Vercel

1. On [Vercel](https://vercel.com), import the repo, set root directory
   to `frontend`.
2. Framework preset: Vite (auto-detected).
3. Add env var `VITE_API_BASE_URL` = your Render backend URL
   (e.g. `https://trusted-ev-fleet-api.onrender.com`).
4. Deploy.

Once both are live, update the backend's `CORS_ORIGINS` env var on Render
to include the final Vercel URL, and redeploy the backend.

## Domain model

Three charging realities per the challenge brief:

- **Home** — own wallbox, shared building system, or no infrastructure.
- **Workplace** — company-owned or shared charging points, limited
  availability.
- **Public** — AC/DC, roaming, fragmented pricing.

Core entities: `Vehicle`, `Driver`, `ChargingEvent`, `FairnessMetric`,
`FleetSummary` — defined in both `frontend/src/types/domain.ts` and
`backend/app/models/domain.py` (kept in sync manually for now).

## Next steps (once the challenge starts)

- [ ] Replace mock data with real MongoDB collections + seed script
- [ ] Design the fairness/savings calculation logic in detail
- [ ] Add a data & trust concept page (what's collected, why, granularity)
- [ ] Add charts (Recharts) for cost breakdown by location type
- [ ] Decide on auth (or skip for demo — single fleet-manager + single driver view)
