import enum
from datetime import date, datetime, time, timezone

from sqlalchemy import Column, Date, DateTime, Enum, ForeignKey, Integer, Table, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from .servico import Servico
from .usuario import Usuario


class StatusAgendamento(str, enum.Enum):
    aguardando = "Aguardando"
    confirmado = "Confirmado"
    concluido = "Concluido"
    cancelado = "Cancelado"


agendamento_servico = Table(
    "agendamento_servico",
    Base.metadata,
    Column("agendamento_id", ForeignKey("agendamentos.id"), primary_key=True),
    Column("servico_id", ForeignKey("servicos.id"), primary_key=True),
)


class Agendamento(Base):
    """TODO (equipe): endpoints, checagem de conflito de horário e notificações."""
    __tablename__ = "agendamentos"

    id: Mapped[int] = mapped_column(primary_key=True)
    dia: Mapped[date] = mapped_column(Date, index=True)
    horario: Mapped[time] = mapped_column(Time)
    barbeiro_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), index=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), index=True)
    status: Mapped[StatusAgendamento] = mapped_column(
        Enum(StatusAgendamento, native_enum=False, values_callable=lambda e: [m.value for m in e]),
        default=StatusAgendamento.aguardando,
    )
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    barbeiro: Mapped[Usuario] = relationship(foreign_keys=[barbeiro_id])
    cliente: Mapped[Usuario] = relationship(foreign_keys=[cliente_id])
    servicos: Mapped[list[Servico]] = relationship(secondary=agendamento_servico)


class Turno(Base):
    """Disponibilidade semanal do barbeiro. TODO (equipe): endpoints e uso no cálculo de horários livres."""
    __tablename__ = "turnos"

    id: Mapped[int] = mapped_column(primary_key=True)
    barbeiro_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), index=True)
    dia_semana: Mapped[int] = mapped_column(Integer)    # 0 = segunda ... 6 = domingo
    inicio: Mapped[time] = mapped_column(Time)
    fim: Mapped[time] = mapped_column(Time)
