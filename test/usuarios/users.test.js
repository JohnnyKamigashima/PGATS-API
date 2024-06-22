const dotEnv = require('dotenv')
dotEnv.config()
const request = require('supertest');
const CadastroBody = require('./class/CadastroBody')
const faker = require('faker');

// Configurando o locale para pt_BR
faker.locale = 'pt_BR';

describe('Suite de testes da api users...', () => {

    const baseUrl = process.env.BASE_URL
    const rota = `/${process.env.ROTA_USUARIOS}`
    const body = new CadastroBody()

    const recebido = []

    beforeAll(async () => {
        const response = await request(baseUrl).post(rota).send(body)

        recebido.id = response.body.id

        expect(response.body.nome).toBe(body.nome)
        expect(response.body.email).toBe(body.email)
        expect(response.body.telefone).toBe(body.telefone)
        expect(response.status).toBe(201)
    })

    it('Consulta todos os usuários...deve retornar status 200.', async () => {

        const response = await request(baseUrl).get(rota)

        expect(response.status).toBe(200)
    })

    it('Deve cadastrar um novo usuário sem nome...deve retornar status 422 e uma mensagem de erro que o campo nome é obrigatório.', async () => {
        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: nome'

        body.nome = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })

    it('Deve verificar se o usuario foi cadastrado com sucesso...deve retornar status 200.', async () => {
        const response = await request(baseUrl).get(`${rota}/${recebido.id}`)

        expect(response.status).toBe(200)
        expect(response.body.email).toBe(body.email)
        expect(response.body.telefone).toBe(body.telefone)
        expect(response.body).toHaveProperty('nome', body.nome)
    })

    it('Deve alterar somente o nome do usuario ja criado...deve retornar status 201', async () => {
        body.nome = faker.name.firstName() + ' ' + faker.name.lastName();

        const responseUpdate = await request(baseUrl).put(`${rota}/${recebido.id}`).send(body)
        const responseGet = await request(baseUrl).get(`${rota}/${recebido.id}`)
        const { id, nome, email, telefone } = responseGet.body

        expect(responseUpdate.status).toBe(201)
        expect(email).toBe(body.email)
        expect(telefone).toBe(body.telefone)
        expect(responseGet.body).toHaveProperty('nome', nome)
    })
    it('Deve alterar tudo do usuario ja criado...deve retornar status 201', async () => {
        body.nome = faker.name.firstName() + ' ' + faker.name.lastName();
        body.telefone = faker.phone.phoneNumber();
        body.senha = faker.internet.password()

        const responseUpdate = await request(baseUrl).put(`${rota}/${recebido.id}`).send(body)
        const responseGet = await request(baseUrl).get(`${rota}/${recebido.id}`)
        const { id, nome, email, telefone } = responseGet.body

        expect(responseUpdate.status).toBe(201)
        expect(email).toBe(body.email)
        expect(telefone).toBe(body.telefone)
        expect(responseGet.body).toHaveProperty('nome', nome)
    })
    it('Deve validar o erro de falta de nome...deve retornar status 422', async () => {

        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: nome'

        body.nome = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })
    it('Deve validar o erro de falta de email...deve retornar status 422', async () => {

        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: email'

        body.email = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })
    it('Deve validar o erro de falta de senha...deve retornar status 422', async () => {

        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: senha'

        body.senha = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })
    it('Deve validar o erro de falta de telefone...deve retornar status 422', async () => {

        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: telefone'

        body.telefone = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })
    it('Deve deletar um registro...deve retornar status 204', async () => {

        const response = await request(baseUrl).delete(`${rota}/${recebido.id}`)
        expect(response.status).toBe(204)

        const responseGet = await request(baseUrl).get(`${rota}/${recebido.id}`)
        expect(responseGet.status).toBe(404)
        expect(responseGet.text).toContain("Usuário não encontrado")
    })
})
