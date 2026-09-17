from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db.mongo import close_client, get_client
from app.routers import fleet


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Warm the Mongo client on startup; close it cleanly on shutdown.
    get_client()
    yield
    await close_client()


app = FastAPI(title="Trusted EV Fleet Charging API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fleet.router)


@app.get("/")
async def root():
    return {"message": "Trusted EV Fleet Charging API — see /docs"}
