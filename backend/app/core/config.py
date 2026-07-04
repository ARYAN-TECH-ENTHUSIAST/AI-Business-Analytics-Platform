from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    app_version: str
    environment: str

    database_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    gemini_api_key: str | None = None

    gemini_model: str = "gemini-2.5-flash",

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()