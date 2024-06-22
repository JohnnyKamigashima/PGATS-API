const request = require('supertest');
const configEnv = require('../../suporte/configEnv')
const baseUrl = configEnv.URLS.BASE_URL
const rota = `/${configEnv.URLS.ROTA_ATIVIDADES}`

describe('Suite de testes da api atividades...', () => {
    it('Consulta todas as atividades...deves retornar status 200.', async () => {
        const response = await request(baseUrl).get(rota)

        expect(response.status).toBe(200)
    })
})
