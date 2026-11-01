from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import TipoUsuario, Usuario
from app.schemas import CadastroCliente, Credenciais, UsuarioPublico
from app.security import COOKIE_SESSAO, criar_token, hash_senha, usuario_atual, verificar_senha

router = APIRouter(prefix="/api", tags=["autenticação"])


@router.post("/cadastro", status_code=201)
def cadastrar(dados: CadastroCliente, db: Session = Depends(get_db)):
    email = dados.email.lower()
    if db.scalar(select(Usuario).where(Usuario.email == email)):
        raise HTTPException(409, "Já existe um parceiro com este e-mail.")
    db.add(Usuario(
        nome=dados.nome.strip(), email=email, senha_hash=hash_senha(dados.password),
        telefone=dados.telefone, data_nascimento=dados.dataNascimento,
        tipo=TipoUsuario.cliente,   # sempre cliente: barbeiro/admin são criados por um admin
    ))
    db.commit()
    return {"message": "Parabéns por entrar para o bando."}


@router.post("/login")
def login(dados: Credenciais, resposta: Response, db: Session = Depends(get_db)):
    usuario = db.scalar(select(Usuario).where(Usuario.email == dados.email.lower()))
    ok = verificar_senha(dados.password, usuario.senha_hash if usuario else None)
    if not usuario or not ok or not usuario.ativo:
        raise HTTPException(401, "E-mail ou senha inválidos.")   # mensagem única: não revela se o e-mail existe
    cfg = get_settings()
    resposta.set_cookie(
        COOKIE_SESSAO, criar_token(usuario.id), httponly=True, samesite="lax",
        secure=cfg.cookie_secure, max_age=cfg.token_expira_minutos * 60, path="/",
    )
    return {"user": UsuarioPublico.model_validate(usuario)}


@router.post("/logout")
def logout(resposta: Response):
    resposta.delete_cookie(COOKIE_SESSAO, path="/")
    return {"message": "Sessão encerrada."}


@router.get("/me")
def eu(usuario: Usuario = Depends(usuario_atual)):
    return {"user": UsuarioPublico.model_validate(usuario)}
