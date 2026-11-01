from datetime import date, time

from pydantic import BaseModel, Field


class AgendamentoCriar(BaseModel):
    dia: date
    horario: time
    barbeiroId: int
    servicos: list[int] = Field(min_length=1)


class AgendamentoOut(BaseModel):
    id: int
    dia: date
    horario: time
    barbeiroId: int
    clienteId: int
    servicos: list[int]
    status: str
