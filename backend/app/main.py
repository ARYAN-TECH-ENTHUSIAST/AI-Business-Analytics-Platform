from fastapi import FastAPI

app = FastAPI(
    title="AI Business Intelligence Platform",
    version="0.1.0",
)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "AI Business Intelligence Platform API"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "healthy"}