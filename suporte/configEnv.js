require('dotenv').config()

module.exports = {
    URLS: {
        ROTA_USUARIOS: process.env.ROTA_USUARIOS,
        BASE_URL: process.env.BASE_URL,
        ROTA_CONTEUDOS: process.env.ROTA_CONTEUDOS,
        ROTA_ATIVIDADES: process.env.ROTA_ATIVIDADES
    },
    HEADERS: {
        API_TOKEN: { "token": "Bearer token" },
        CONTENT_TYPE: { "accept": "application/json" }
    }
}