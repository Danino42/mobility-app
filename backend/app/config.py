from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Environment-driven configuration.
    Locally, values come from `.env`. On Render, set these as environment
    variables in the service dashboard.
    """

    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "trusted_ev_fleet"

    # Comma-separated list of allowed origins for CORS.
    # e.g. "http://localhost:5173,https://your-app.vercel.app"
    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
