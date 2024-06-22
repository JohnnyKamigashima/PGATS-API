const request = require('supertest');
const CadastroBody = require('./class/CadastroBody')
const dotEnv = require('dotenv')
dotEnv.config()
const baseUrl = process.env.BASE_URL
const rota = `/${process.env.ROTA_USUARIOS}`
const faker = require('faker-br')
const body = new CadastroBody()
let idRecebido = null

const verificaGeraNovoEmail = async (bodyCriar) => {
    console.log(baseUrl)
    let novoEmail = bodyCriar.fakeEmail()
    const responseGet = await request(baseUrl).get(rota)
    const listaEmails = responseGet.body.map((item) => item.email)

    while (novoEmail in listaEmails) {
        novoEmail = bodyCriar.fakeEmail()
    }
    return novoEmail
}
describe('Suite de testes da api users...', () => {

    beforeAll(async () => {
        body.nome = body.fakeNome()
        body.email = await verificaGeraNovoEmail(body)
        body.telefone = body.fakeTelefone()
        body.senha = body.fakeSenha()
    })

    it('Consulta todos os usuários...deve retornar status 200.', async () => {
        const response = await request(baseUrl).get(rota)

        expect(response.status).toBe(200)
    })

    it('Deve cadastrar um novo usuário...deve retornar status 201.', async () => {

        const response = await request(baseUrl).post(rota).send(body)

        expect(response.body.nome).toBe(body.nome)
        expect(response.body.email).toBe(body.email)
        expect(response.body.telefone).toBe(body.telefone)
        idRecebido = response.body.id
        expect(response.status).toBe(201)
    })
    it('Deve cadastrar um novo usuário sem nome...deve retornar status 422 e uma mensagem de erro que o campo nome é obrigatório.', async () => {
        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: nome'

        body.email = await verificaGeraNovoEmail(body)
        body.telefone = body.fakeTelefone()
        body.senha = body.fakeSenha()
        body.nome = null

        const response = await request(baseUrl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })

    it('Deve verificar se o usuario foi cadastrado com sucesso...deve retornar status 200.', async () => {
        const response = await request(baseUrl).get(`${rota}/${idRecebido}`)

        expect(response.status).toBe(200)
        expect(response.body.email).toBe(body.email)
        expect(response.body.telefone).toBe(body.telefone)
        expect(response.body.nome).toBe(body.nome)
    })
})
