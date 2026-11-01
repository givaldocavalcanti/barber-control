from conftest import entrar


def test_cadastro_ignora_tipo_enviado_pelo_navegador(client):
    r = client.post("/api/cadastro", json={
        "nome": "Novo Cliente", "email": "novo@t.com", "password": "123456", "type": "admin"})
    assert r.status_code == 201
    assert entrar(client, "novo@t.com", "123456").json()["user"]["type"] == "cliente"


def test_cadastro_email_duplicado(client):
    r = client.post("/api/cadastro", json={"nome": "Outro", "email": "CLI@t.com", "password": "123456"})
    assert r.status_code == 409 and "error" in r.json()


def test_cadastro_senha_curta(client):
    r = client.post("/api/cadastro", json={"nome": "Fulano", "email": "f@t.com", "password": "123"})
    assert r.status_code == 422 and r.json()["error"] == "Dados inválidos."


def test_login_formato_do_frontend(client):
    r = entrar(client, "cli@t.com", "123456")
    user = r.json()["user"]
    assert set(user) == {"nome", "email", "telefone", "dataNascimento", "type"}
    assert "password" not in user and "senha_hash" not in user
    assert "httponly" in r.headers["set-cookie"].lower()


def test_login_invalido_mensagem_unica(client):
    a = client.post("/api/login", json={"email": "cli@t.com", "password": "errada"})
    b = client.post("/api/login", json={"email": "naoexiste@t.com", "password": "errada"})
    assert a.status_code == b.status_code == 401 and a.json() == b.json()


def test_me_exige_sessao_e_cookie_adulterado_falha(client):
    assert client.get("/api/me").status_code == 401
    client.cookies.set("barber-session", '{"email":"admin@t.com","type":"admin"}')
    assert client.get("/api/me").status_code == 401


def test_logout(client):
    entrar(client, "cli@t.com", "123456")
    assert client.get("/api/me").status_code == 200
    client.post("/api/logout")
    assert client.get("/api/me").status_code == 401
