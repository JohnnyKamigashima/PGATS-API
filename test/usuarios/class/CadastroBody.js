const faker = require('faker-br')

class CadastroBody {
    nome = null
    telefone = null
    email = null
    senha = null

    fakeEmail = () => {
        return faker.internet.email()
    }

    fakeNome = () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        return `${firstName} ${lastName}`
    }

    fakeTelefone = () => {
        return faker.phone.phoneNumber()
    }

    fakeSenha = () => {
        return faker.internet.password()
    }

}

module.exports = CadastroBody