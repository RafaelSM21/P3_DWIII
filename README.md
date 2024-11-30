Testar as requisições no Thunder Client

http://localhost:3000/eventos

POST:
{
    "titulo": "Show de Música",
    "descricao": "Show de uma banda famosa.",
    "data": "2024-12-25T20:00:00Z",  // Formato ISO 8601 com data e hora
    "local": "Arena Stadium",
    "valor": 100
}

PUT:
{
    "id": "id_do_evento",  // Substitua pelo ID do evento que deseja atualizar
    "titulo": "Show de Música Atualizado",
    "descricao": "Novo show da banda famosa.",
    "data": "2024-12-26T18:00:00Z",  // A nova data e hora
    "local": "Arena Arena",
    "valor": 120
}

DELETE:
{
    "id": "id_do_evento"  // Substitua pelo ID do evento que deseja excluir
}
