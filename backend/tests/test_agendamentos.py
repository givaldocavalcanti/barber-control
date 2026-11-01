from conftest import entrar


def test_cliente_cria_e_lista_agendamento(client):
    entrar(client, "admin@t.com", "admin123")
    barbeiro = client.post(
        "/api/barbeiros",
        json={"nome": "Barbeiro Agenda", "email": "agenda@t.com", "password": "123456"},
    ).json()
    servico = client.post(
        "/api/servicos",
        json={"nome": "Corte Agenda", "tempoEstimado": 30, "valor": 40},
    ).json()

    client.post("/api/logout")
    entrar(client, "cli@t.com", "123456")
    criado = client.post(
        "/api/agendamentos",
        json={
            "dia": "2026-11-02",
            "horario": "14:00",
            "barbeiroId": barbeiro["id"],
            "servicos": [servico["id"]],
        },
    )

    assert criado.status_code == 201
    assert criado.json()["servicos"] == [servico["id"]]
    assert len(client.get("/api/agendamentos").json()) == 1


def test_barbeiro_nao_cria_agendamento(client):
    entrar(client, "admin@t.com", "admin123")
    client.post(
        "/api/barbeiros",
        json={"nome": "Barbeiro Agenda", "email": "agenda@t.com", "password": "123456"},
    )
    client.post("/api/logout")
    entrar(client, "agenda@t.com", "123456")

    resposta = client.post(
        "/api/agendamentos",
        json={
            "dia": "2026-11-02",
            "horario": "14:00",
            "barbeiroId": 2,
            "servicos": [1],
        },
    )

    assert resposta.status_code == 403
