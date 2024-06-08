import { Usuarios } from './Usuarios'

const usuarios = new Usuarios()

const main = async () => {
    console.log(JSON.stringify(await usuarios.getAll(), null, 2))
}

main()