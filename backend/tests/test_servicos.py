from conftest import entrar

NOVO = {"nome": "Sobrancelha", "tempoEstimado": 15, "valor": 20}


def test_cliente_nao_cria_servico(client):
    entrar(client, "cli@t.com", "123456")
    assert client.post("/api/servicos", json=NOVO).status_code == 403


def test_sem_login_nao_lista(client):
    assert client.get("/api/servicos").status_code == 401


def test_admin_cria_lista_edita_e_desativa(client):
    entrar(client, "admin@t.com", "admin123")
    criado = client.post("/api/servicos", json=NOVO)
    assert criado.status_code == 201
    s = criado.json()
    assert s["tempoEstimado"] == 15 and s["valor"] == 20 and isinstance(s["valor"], (int, float))
    assert client.post("/api/servicos", json=NOVO).status_code == 409

    r = client.patch(f"/api/servicos/{s['id']}", json={"valor": 25, "tempoEstimado": 20})
    assert r.json()["valor"] == 25 and r.json()["tempoEstimado"] == 20

    assert client.delete(f"/api/servicos/{s['id']}").status_code == 204
    assert client.get("/api/servicos").json() == []
    assert len(client.get("/api/servicos?todos=true").json()) == 1


def test_admin_cadastra_barbeiro_e_cliente_ve_na_lista(client):
    entrar(client, "admin@t.com", "admin123")
    r = client.post("/api/barbeiros", json={"nome": "Barbeiro Novo", "email": "b@t.com", "password": "123456"})
    assert r.status_code == 201 and r.json()["type"] == "barbeiro"
    client.post("/api/logout")
    entrar(client, "cli@t.com", "123456")
    assert [b["email"] for b in client.get("/api/barbeiros").json()] == ["b@t.com"]
    assert client.post("/api/barbeiros", json={"nome": "Hacker", "email": "h@t.com", "password": "123456"}).status_code == 403
