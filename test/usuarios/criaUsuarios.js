import { Common } from '../../common/Common'
import { Usuarios } from './Usuarios'

const common = new Common()

const main = async () => {
    const usuarios = new Usuarios()
    usuarios.nome = await common.prompt("Qual o nome do usuário? ")
    if (usuarios.nome == "") {
        usuarios.nome = await usuarios.generateRandomName()
    }
    usuarios.email = await common.prompt("Qual o email do usuário? ")
    if (usuarios.email == "") {
        usuarios.email = await usuarios.generateRandomEmail()
    }
    usuarios.senha = await common.prompt("Qual a senha do usuário? ")
    if (usuarios.senha == "") {
        usuarios.senha = await usuarios.generateRandomPassword()
    }
    usuarios.telefone = await common.prompt("Qual o telefone do usuário? ")
    if (usuarios.telefone == "") {
        usuarios.telefone = await usuarios.generateRandomPhone()
    }

    usuarios.criar(usuarios)
}

main()