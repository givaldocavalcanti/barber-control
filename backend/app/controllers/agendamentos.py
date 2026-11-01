from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Agendamento, Servico, TipoUsuario, Usuario
from app.schemas import AgendamentoCriar, AgendamentoOut
from app.security import usuario_atual

router = APIRouter(prefix="/api/agendamentos", tags=["agendamentos"])


def _saida(agendamento: Agendamento) -> AgendamentoOut:
    return AgendamentoOut(
        id=agendamento.id,
        dia=agendamento.dia,
        horario=agendamento.horario,
        barbeiroId=agendamento.barbeiro_id,
        clienteId=agendamento.cliente_id,
        servicos=[servico.id for servico in agendamento.servicos],
        status=agendamento.status.value,
    )


@router.get("", response_model=list[AgendamentoOut])
def listar(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(usuario_atual),
):
    consulta = select(Agendamento).order_by(Agendamento.dia, Agendamento.horario)
    if usuario.tipo == TipoUsuario.cliente:
        consulta = consulta.where(Agendamento.cliente_id == usuario.id)
    elif usuario.tipo == TipoUsuario.barbeiro:
        consulta = consulta.where(Agendamento.barbeiro_id == usuario.id)
    return [_saida(item) for item in db.scalars(consulta).all()]


@router.post("", response_model=AgendamentoOut, status_code=201)
def criar(
    dados: AgendamentoCriar,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(usuario_atual),
):
    if usuario.tipo != TipoUsuario.cliente:
        raise HTTPException(403, "Somente clientes podem criar agendamentos.")

    barbeiro = db.scalar(
        select(Usuario).where(
            Usuario.id == dados.barbeiroId,
            Usuario.tipo == TipoUsuario.barbeiro,
            Usuario.ativo.is_(True),
        )
    )
    if not barbeiro:
        raise HTTPException(422, "Barbeiro inválido.")

    ids = set(dados.servicos)
    if len(ids) != len(dados.servicos):
        raise HTTPException(422, "Não é permitido repetir serviços.")
    servicos = db.scalars(
        select(Servico).where(Servico.id.in_(ids), Servico.ativo.is_(True))
    ).all()
    if len(servicos) != len(ids):
        raise HTTPException(422, "Um ou mais serviços são inválidos.")

    agendamento = Agendamento(
        dia=dados.dia,
        horario=dados.horario,
        barbeiro_id=barbeiro.id,
        cliente_id=usuario.id,
        servicos=servicos,
    )
    db.add(agendamento)
    db.commit()
    db.refresh(agendamento)
    return _saida(agendamento)
