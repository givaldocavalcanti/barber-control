from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


DEFAULT_DATABASE_URL = f"sqlite:///{Path(__file__).resolve().parents[1] / 'barber.db'}"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = DEFAULT_DATABASE_URL
    secret_key: str = "troque-esta-chave-em-desenvolvimento"
    token_expira_minutos: int = 60 * 24
    cookie_secure: bool = False          # True em produção (HTTPS)
    cors_origins: list[str] = ["http://localhost:3000"]
    seed_dev: bool = True                # popula dados de exemplo no banco vazio


@lru_cache
def get_settings() -> Settings:
    return Settings()
