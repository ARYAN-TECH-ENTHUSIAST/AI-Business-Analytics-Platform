from fastapi import FastAPI
 
from app.core.config import settings

from sqlalchemy import text

from app.database.connection import engine

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)


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