import enum
from datetime import date, datetime, timezone

from sqlalchemy import Boolean, Date, DateTime, Enum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class TipoUsuario(str, enum.Enum):
    cliente = "cliente"
    barbeiro = "barbeiro"
    admin = "admin"


def _agora():
    return datetime.now(timezone.utc)


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    senha_hash: Mapped[str] = mapped_column(String(255))
    telefone: Mapped[str | None] = mapped_column(String(30))
    data_nascimento: Mapped[date | None] = mapped_column(Date)
    tipo: Mapped[TipoUsuario] = mapped_column(
        Enum(TipoUsuario, native_enum=False, values_callable=lambda e: [m.value for m in e]),
        default=TipoUsuario.cliente,
    )
    ativo: Mapped[bool] = mapped_column(Boolean, default=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_agora)
