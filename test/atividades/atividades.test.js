const request = require('supertest');
const dotEnv = require('dotenv')
dotEnv.config()
const baseUrl = process.env.BASE_URL
const rota = `/${process.env.ROTA_USUARIOS}`

describe('Suite de testes da api atividades...', () => {
    it('Consulta todas as atividades...deves retornar status 200.', async () => {
        const response = await request(baseUrl).get(rota)

        expect(response.status).toBe(200)
    })
})
