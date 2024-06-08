import { Common } from '../../common/Common';
import { expect } from 'bun:test'
const faker = require('faker-br');
const common = new Common()

faker.locale = 'pt_BR'
export class Usuarios {

    nome: string = ""
    telefone: string = "(11) 99999-9999"
    email: string = "admin@com.com"
    senha: string = "admin"

    criar = async (body: this) => {
        const headers: any = {
            "Content-Type": "application/json"
        }
        const url: string = "http://localhost:3000/users"
        const response = await common.post(url, headers, body)
        expect(response.statusCode).toBe(201)
    }

    getAll = async () => {
        const headers: any = {
        }
        const url: string = "http://localhost:3000/users"
        const params = new URLSearchParams()
        const response = await common.get(url, headers, params)
        expect(response.statusCode).toBe(200)
        return await response.body
    }

    async generateRandomName() {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const randomName = `${firstName} ${lastName}`;
        return randomName;
    }
    async generateRandomPhone() {
        return faker.phone.phoneNumber();
    }

    async generateRandomEmail() {
        return faker.internet.email();
    }

    async generateRandomPassword() {
        return faker.internet.password();
    }
}