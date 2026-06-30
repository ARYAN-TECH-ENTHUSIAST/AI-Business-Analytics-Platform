from fastapi import FastAPI
from sqlalchemy import text

from app.api.v1.auth import router as auth_router
from app.api.v1.workspace import router as workspace_router
from app.core.config import settings
from app.database.connection import engine
from app.api.v1.dataset import router as dataset_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.dashboard import router as dashboard_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(workspace_router, prefix="/api/v1")
app.include_router(dataset_router,prefix="/api/v1")
app.include_router(
    analytics_router,
    prefix="/api/v1",
)
app.include_router(
    dashboard_router,
    prefix="/api/v1",
)


@app.get("/")
def root():
    return {
        "message": "AI Business Intelligence Platform API",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.get("/health/db")
def database_health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "database": "connected",
    }