const request = require('supertest');
const baseurl = 'http://localhost:3000'
const rota = `/users`
const CadastroBody = require('./class/CadastroBody')

const verificaGeraNovoEmail = async (bodyCriar) => {
    let novoEmail = bodyCriar.fakeEmail()
    const responseGet = await request(baseurl).get(rota)
    const listaEmails = responseGet.body.map((item) => item.email)

    while (novoEmail in listaEmails) {
        novoEmail = bodyCriar.fakeEmail()
    }
    return novoEmail
}
describe('Suite de testes da api users...', () => {
    it('Consulta todos os usuários...deve retornar status 200.', async () => {
        const response = await request(baseurl).get(rota)

        expect(response.status).toBe(200)
    })

    it('Deve cadastrar um novo usuário...deve retornar status 200.', async () => {
        const body = new CadastroBody()

        body.nome = body.fakeNome()
        body.email = await verificaGeraNovoEmail(body)
        body.telefone = body.fakeTelefone()
        body.senha = body.fakeSenha()

        const response = await request(baseurl).post(rota).send(body)
        expect(response.status).toBe(200)
    })
    it('Deve cadastrar um novo usuário sem nome...deve retornar status 422.', async () => {
        const body = new CadastroBody()
        const respostaErro = 'Os seguintes campos são obrigatórios: nome'

        body.email = await verificaGeraNovoEmail(body)
        body.telefone = body.fakeTelefone()
        body.senha = body.fakeSenha()
        body.nome = null

        const response = await request(baseurl).post(rota).send(body)
        expect(response.status).toBe(422)
        expect(response.text).toContain(respostaErro)
    })
})
