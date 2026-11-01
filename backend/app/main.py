from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app import models  # noqa: F401  (registra as tabelas)
from app.config import get_settings
from app.controllers import auth, servicos, usuarios
from app.database import Base, SessionLocal, engine
from app.seed import popular


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(engine)    # TODO (equipe): trocar por migrations (Alembic)
    if get_settings().seed_dev:
        with SessionLocal() as db:
            popular(db)
    yield


app = FastAPI(title="BarberControl API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware, allow_origins=get_settings().cors_origins,
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)


# O frontend lê `result.error`; padronizamos todas as respostas de erro nesse formato.
@app.exception_handler(StarletteHTTPException)
async def erro_http(_: Request, exc: StarletteHTTPException):
    return JSONResponse({"error": exc.detail}, status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def erro_validacao(_: Request, exc: RequestValidationError):
    campos = [".".join(str(p) for p in e["loc"][1:]) for e in exc.errors()]
    return JSONResponse({"error": "Dados inválidos.", "campos": campos}, status_code=422)


app.include_router(auth.router)
app.include_router(servicos.router)
app.include_router(usuarios.router)


@app.get("/api/health", tags=["infra"])
def health():
    return {"status": "ok"}
