from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Servico, TipoUsuario, Usuario
from app.schemas import ServicoAtualizar, ServicoCriar, ServicoOut
from app.security import exige_tipos, usuario_atual

router = APIRouter(prefix="/api/servicos", tags=["serviços"])
somente_admin = Depends(exige_tipos(TipoUsuario.admin))


@router.get("", response_model=list[ServicoOut])
def listar(todos: bool = False, db: Session = Depends(get_db), usuario: Usuario = Depends(usuario_atual)):
    consulta = select(Servico).order_by(Servico.nome)
    if not (todos and usuario.tipo == TipoUsuario.admin):   # só o admin enxerga os desativados
        consulta = consulta.where(Servico.ativo.is_(True))
    return db.scalars(consulta).all()


@router.post("", response_model=ServicoOut, status_code=201, dependencies=[somente_admin])
def criar(dados: ServicoCriar, db: Session = Depends(get_db)):
    if db.scalar(select(Servico).where(Servico.nome == dados.nome.strip())):
        raise HTTPException(409, "Já existe um serviço com este nome.")
    servico = Servico(nome=dados.nome.strip(), tempo_estimado=dados.tempoEstimado, valor=dados.valor)
    db.add(servico)
    db.commit()
    return servico


@router.patch("/{servico_id}", response_model=ServicoOut, dependencies=[somente_admin])
def atualizar(servico_id: int, dados: ServicoAtualizar, db: Session = Depends(get_db)):
    servico = db.get(Servico, servico_id)
    if not servico:
        raise HTTPException(404, "Serviço não encontrado.")
    campos = dados.model_dump(exclude_unset=True)
    if "tempoEstimado" in campos:
        servico.tempo_estimado = campos.pop("tempoEstimado")
    for chave, valor in campos.items():
        setattr(servico, chave, valor)
    db.commit()
    return servico


@router.delete("/{servico_id}", status_code=204, dependencies=[somente_admin])
def desativar(servico_id: int, db: Session = Depends(get_db)):
    """Desativa em vez de apagar, para não quebrar agendamentos antigos."""
    servico = db.get(Servico, servico_id)
    if not servico:
        raise HTTPException(404, "Serviço não encontrado.")
    servico.ativo = False
    db.commit()
