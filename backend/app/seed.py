"""Dados de exemplo (só desenvolvimento). Espelha frontend/lib/mockDB.ts."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Servico, TipoUsuario, Usuario
from app.security import hash_senha

USUARIOS = [
    ("Breno Oliveira", "breno@barber.com", TipoUsuario.admin),
    ("Julio Barbosa", "julio@barber.com", TipoUsuario.barbeiro),
    ("Richard Hausseman", "richard@barber.com", TipoUsuario.barbeiro),
    ("Jhonatan Moreira", "jhonatan@user.com", TipoUsuario.cliente),
    ("Bruno Oliveira", "bruno@user.com", TipoUsuario.cliente),
]
SERVICOS = [
    ("Corte Alpha", 30, 45.00),
    ("Barba Terapia", 30, 35.00),
    ("Combo Matilha (Corte + Barba)", 60, 75.00),
    ("Platinado", 120, 150.00),
]


def popular(db: Session) -> None:
    senha = hash_senha("123456")   # senha de desenvolvimento
    usuarios_existentes = {
        email for email in db.scalars(select(Usuario.email)).all()
    }
    db.add_all(
        Usuario(nome=nome, email=email, senha_hash=senha, tipo=tipo)
        for nome, email, tipo in USUARIOS
        if email not in usuarios_existentes
    )

    servicos_existentes = {
        nome for nome in db.scalars(select(Servico.nome)).all()
    }
    db.add_all(
        Servico(nome=nome, tempo_estimado=tempo, valor=valor)
        for nome, tempo, valor in SERVICOS
        if nome not in servicos_existentes
    )
    db.commit()
