const request = require('supertest');
const baseurl = 'http://localhost:3000'
const rota = `/activities`

describe('Suite de testes da api atividades...', () => {
    it('Consulta todas as atividades...deves retornar status 200.', async () => {
        const response = await request(baseurl).get(rota)

        expect(response.status).toBe(200)
    })
})
