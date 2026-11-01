import os
os.environ["DATABASE_URL"] = "sqlite://"   # banco em memória
os.environ["SEED_DEV"] = "false"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from app.database import Base, get_db
from app.main import app
from app.models import TipoUsuario, Usuario
from app.security import hash_senha


@pytest.fixture()
def db():
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    sessao = sessionmaker(bind=engine, expire_on_commit=False)()
    sessao.add_all([
        Usuario(nome="Admin Teste", email="admin@t.com", senha_hash=hash_senha("admin123"), tipo=TipoUsuario.admin),
        Usuario(nome="Cliente Teste", email="cli@t.com", senha_hash=hash_senha("123456"), tipo=TipoUsuario.cliente),
    ])
    sessao.commit()
    yield sessao
    sessao.close()


@pytest.fixture()
def client(db):
    app.dependency_overrides[get_db] = lambda: db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def entrar(client, email, senha):
    r = client.post("/api/login", json={"email": email, "password": senha})
    assert r.status_code == 200, r.text
    return r
