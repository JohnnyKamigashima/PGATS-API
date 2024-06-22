const faker = require('faker')

class CadastroBody {
    nome = null
    telefone = null
    email = null
    senha = null

    constructor() {
        this.nome = faker.name.firstName() + ' ' + faker.name.lastName();
        this.email = faker.internet.email();
        this.telefone = faker.phone.phoneNumber();
        this.senha = faker.internet.password()
    }
}

module.exports = CadastroBody