from datetime import date

from pydantic import AliasChoices, BaseModel, ConfigDict, EmailStr, Field

from app.models import TipoUsuario

# Os nomes seguem o contrato que o frontend já usa (models/types.ts):
# nome, email, telefone, dataNascimento, type.


class CadastroCliente(BaseModel):
    """O campo `type` enviado pelo navegador é ignorado: o servidor sempre cria um cliente."""
    nome: str = Field(min_length=3, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    telefone: str | None = Field(default=None, max_length=30)
    dataNascimento: date | None = None


class CadastroBarbeiro(CadastroCliente):
    pass


class Credenciais(BaseModel):
    email: EmailStr
    password: str


class UsuarioPublico(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    nome: str
    email: EmailStr
    telefone: str | None = None
    dataNascimento: date | None = Field(
        default=None, validation_alias=AliasChoices("data_nascimento", "dataNascimento")
    )
    type: TipoUsuario = Field(validation_alias=AliasChoices("tipo", "type"))
