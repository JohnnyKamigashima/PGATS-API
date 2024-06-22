# PGATS-API

Este repositório foi criado para acompanhamento e finalização da aula de Testes Automatizados em API Rest com Node.js ministrado pela professora Taynara Luana Caetano.

As tecnologias utilizadas nestes testes são:
- node
- jest
- supertest
- faker-js
- dotenv
- eslint/js
- jest-stare

Para execução dos testes é necessário ter configurado o arquivo .env com as seguintes variáveis:
```
BASE_URL=http://localhost:3000
ROTA_USUARIOS=users
ROTA_CONTEUDOS=conteudos
ROTA_ATIVIDADES=activities
```
Também é necessário estar com o backend executando na porta 3000:    

[Crud clientes node](https://github.com/taynaraluanacaetano/crud_clientes_node)

Para execução dos testes, basta executar o comando:
```
npm install
npm run <script>
```

Os scripts disponíveis são:
 - test : Executa todos os testes
 - testUser : Executa testes da rota Users
 - testConteudos : Executa testes da rota activities
