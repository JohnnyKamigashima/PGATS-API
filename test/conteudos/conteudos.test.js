const request = require('supertest');
const configEnv = require('../../suporte/configEnv.js')
const baseUrl = configEnv.URLS.BASE_URL
const rota = `/${configEnv.URLS.ROTA_CONTEUDOS}`
const ConteudoPostBody = require('./class/ConteudoPostBody.js')
const body = new ConteudoPostBody()
const dataAtual = new Date(Date.now()).toISOString().substring(0, 16)
const delayMaximo = 100
let idCadastro = null

describe('Suite de testes do trabalho de entrega', () => {
    beforeAll(async () => {
        const timeInicial = Date.now()
        const responsePost = await request(baseUrl).post(rota).send(body)
        const timeFinal = Date.now()
        idCadastro = responsePost.body.id

        expect(timeFinal - timeInicial).toBeLessThanOrEqual(delayMaximo)
    })

    describe('Parte 1 - Testes na uri de Conteúdos', () => {
        it('TC1 - Deve cadastrar um novo conteúdo, verificar que o conteúdo está retornando os dados esperados... status code 201', async () => {

            const responsePost = await request(baseUrl).post(rota).send(body)
            const { conteudo, dataCadastro, descricao, id, tipoConteudo, titulo } = responsePost.body

            expect(responsePost.status).toBe(201)
            expect(id).toBe(id)
            expect(titulo).toBe(body.titulo)
            expect(descricao).toBe(body.descricao)
            expect(tipoConteudo).toBe(body.tipoConteudo)
            expect(conteudo).toBe(body.conteudo)
            expect(dataCadastro).toContain(dataAtual)
        })

        it('TC2 - Deverá realizar a consulta desse conteúdo em que acabou de cadastrar, e verificar se realmente está sendo retornado o conteúdo desejado com os dados desejados....deve retornar status 200.', async () => {
            const responseGet = await request(baseUrl).get(`${rota}/${idCadastro}`)

            expect(responseGet.status).toBe(200)
            expect(responseGet.body.id).toBe(idCadastro)
            expect(responseGet.body.titulo).toBe(body.titulo)
            expect(responseGet.body.descricao).toBe(body.descricao)
            expect(responseGet.body.tipoConteudo).toBe(body.tipoConteudo)
            expect(responseGet.body.conteudo).toBe(body.conteudo)
            expect(responseGet.body.dataCadastro).toContain(dataAtual)
        })

        it('TC3 - Deve alterar o conteúdo consultado anteriormente, e em seguida validar se realmente os dados foram alterados...deve retornar status 201', async () => {

            const bodyNovo = new ConteudoPostBody()
            const responsePut = await request(baseUrl).put(`${rota}/${idCadastro}`).send(bodyNovo)

            expect(responsePut.status).toBe(201)
            expect(responsePut.body.id).toBe(idCadastro)
            expect(responsePut.body.titulo).toBe(bodyNovo.titulo)
            expect(responsePut.body.descricao).toBe(bodyNovo.descricao)
            expect(responsePut.body.tipoConteudo).toBe(bodyNovo.tipoConteudo)
            expect(responsePut.body.conteudo).toBe(bodyNovo.conteudo)

            const responseGet = await request(baseUrl).get(`${rota}/${idCadastro}`)

            expect(responseGet.status).toBe(200)
            expect(responseGet.body.id).toBe(idCadastro)
            expect(responseGet.body.titulo).toBe(bodyNovo.titulo)
            expect(responseGet.body.descricao).toBe(bodyNovo.descricao)
            expect(responseGet.body.tipoConteudo).toBe(bodyNovo.tipoConteudo)
            expect(responseGet.body.conteudo).toBe(bodyNovo.conteudo)
            expect(responseGet.body.dataCadastro).toContain(dataAtual)
        })

        it('TC4 - Deve remover o conteúdo e garantir que o mesmo foi removido e não existe mais para consulta...deve retornar status 200', async () => {
            const responseDelete = await request(baseUrl).delete(`${rota}/${idCadastro}`)

            expect(responseDelete.status).toBe(200)
// expect(responseDelete.body.message).toBe('Conteúdo removido com sucesso')

            const responseGet = await request(baseUrl).get(`${rota}/${idCadastro}`)

            expect(responseGet.status).toBe(404)
            // expect(responseGet.body.message).toBe('Conteúdo não encontrado')
        })
    })
})
