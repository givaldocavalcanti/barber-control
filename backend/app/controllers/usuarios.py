from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import TipoUsuario, Usuario
from app.schemas import CadastroBarbeiro, UsuarioPublico
from app.security import exige_tipos, hash_senha, usuario_atual

router = APIRouter(prefix="/api/barbeiros", tags=["equipe"])


@router.get("", response_model=list[UsuarioPublico])
def listar(db: Session = Depends(get_db), _: Usuario = Depends(usuario_atual)):
    return db.scalars(
        select(Usuario).where(Usuario.tipo == TipoUsuario.barbeiro, Usuario.ativo.is_(True)).order_by(Usuario.nome)
    ).all()


@router.post("", response_model=UsuarioPublico, status_code=201, dependencies=[Depends(exige_tipos(TipoUsuario.admin))])
def cadastrar(dados: CadastroBarbeiro, db: Session = Depends(get_db)):
    email = dados.email.lower()
    if db.scalar(select(Usuario).where(Usuario.email == email)):
        raise HTTPException(409, "Já existe um usuário com este e-mail.")
    barbeiro = Usuario(
        nome=dados.nome.strip(), email=email, senha_hash=hash_senha(dados.password),
        telefone=dados.telefone, data_nascimento=dados.dataNascimento, tipo=TipoUsuario.barbeiro,
    )
    db.add(barbeiro)
    db.commit()
    return barbeiro
