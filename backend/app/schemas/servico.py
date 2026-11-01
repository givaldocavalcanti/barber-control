from pydantic import AliasChoices, BaseModel, ConfigDict, Field


class ServicoCriar(BaseModel):
    nome: str = Field(min_length=2, max_length=120)
    tempoEstimado: int = Field(gt=0, le=480, description="minutos")
    valor: float = Field(gt=0)


class ServicoAtualizar(BaseModel):
    nome: str | None = Field(default=None, min_length=2, max_length=120)
    tempoEstimado: int | None = Field(default=None, gt=0, le=480)
    valor: float | None = Field(default=None, gt=0)
    ativo: bool | None = None


class ServicoOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    tempoEstimado: int = Field(validation_alias=AliasChoices("tempo_estimado", "tempoEstimado"))
    valor: float
    ativo: bool
