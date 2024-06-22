const faker = require('faker');

class ConteudoPostBody {
    titulo = "string"
    descricao = "string"
    tipoConteudo = "string"
    conteudo = "string"

    constructor() {
        this.titulo = faker.lorem.lines(1)
        this.descricao = faker.lorem.lines(5)
        this.tipoConteudo = faker.lorem.words(3)
        this.conteudo = faker.lorem.lines(10)
    }
}

module.exports = ConteudoPostBody