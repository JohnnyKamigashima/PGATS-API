const request = require('supertest');
const baseurl = 'http://localhost:3000'
const rota = `/conteudos`

describe('Suite de testes da api conteudos...', () => {
    it('Consulta todos os conteudos...devem retornar status 200.', async () => {
        const response = await request(baseurl).get(rota)

        expect(response.status).toBe(200)
    })
})
