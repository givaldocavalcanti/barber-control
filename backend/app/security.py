from datetime import datetime, timedelta, timezone

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerifyMismatchError
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import TipoUsuario, Usuario

COOKIE_SESSAO = "barber-session"   # mesmo nome que o proxy.ts do frontend já verifica
_ph = PasswordHasher()
_HASH_FALSO = _ph.hash("senha-falsa")  # iguala o tempo de resposta quando o e-mail não existe


def hash_senha(senha: str) -> str:
    return _ph.hash(senha)


def verificar_senha(senha: str, hash_: str | None) -> bool:
    try:
        return _ph.verify(hash_ or _HASH_FALSO, senha) and hash_ is not None
    except (VerifyMismatchError, InvalidHashError):
        return False


def criar_token(usuario_id: int) -> str:
    cfg = get_settings()
    exp = datetime.now(timezone.utc) + timedelta(minutes=cfg.token_expira_minutos)
    return jwt.encode({"sub": str(usuario_id), "exp": exp}, cfg.secret_key, algorithm="HS256")


def usuario_atual(request: Request, db: Session = Depends(get_db)) -> Usuario:
    token = request.cookies.get(COOKIE_SESSAO)
    if not token:
        raise HTTPException(401, "Não autenticado.")
    try:
        dados = jwt.decode(token, get_settings().secret_key, algorithms=["HS256"])
        usuario = db.get(Usuario, int(dados["sub"]))
    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(401, "Sessão inválida ou expirada.")
    if not usuario or not usuario.ativo:
        raise HTTPException(401, "Sessão inválida ou expirada.")
    return usuario


def exige_tipos(*tipos: TipoUsuario):
    """Uso: Depends(exige_tipos(TipoUsuario.admin))"""
    def dependencia(usuario: Usuario = Depends(usuario_atual)) -> Usuario:
        if usuario.tipo not in tipos:
            raise HTTPException(403, "Você não tem permissão para esta ação.")
        return usuario
    return dependencia
