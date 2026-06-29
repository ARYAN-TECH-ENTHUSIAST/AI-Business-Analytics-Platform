from fastapi import FastAPI
 
from app.core.config import settings

from sqlalchemy import text

from app.database.connection import engine

from app.api.v1.auth import router as auth_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "AI Business Intelligence Platform API"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy"}

@app.get("/health/db")
def database_health() -> dict[str, str]:
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {"database": "connected"}