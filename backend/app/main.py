from fastapi import FastAPI
 
from app.core.config import settings

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