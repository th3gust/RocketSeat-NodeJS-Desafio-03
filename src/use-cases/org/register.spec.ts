import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory-repositories/in-memory-orgs-repository'
import { ORGAlreadyExistsError } from '../errors/org-already-exists-error'

// criando as variáveis e dizendo a tipagem delas
let orgRegister: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register ORG Use Case', () => {
  beforeEach(() => {
    // antes de cada teste a variável sut recebe uma instância da classe RegisterUseCase com o repositório do InMemoryUserRepository, assim qualquer método do this.usersRepository do InMemory agora virará userRegister
    orgRegister = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgRegister)
  })

  it('should be able to register a org', async () => {
    // criar um usuário

    const { org } = await sut.execute({
      name: 'Teste ORG',
      phone: 'Test ORG Phone',
      email: 'org@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    // cria um usuário
    const { org } = await sut.execute({
      name: 'Teste ORG',
      phone: 'Test ORG Phone',
      email: 'org@email.com',
      password: '123456',
    })

    // como é para validar o hash criamos outra senha igual com hash e vemos se vai ficar igual a senha do usuário
    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    // espero que a comparação da constante seja verdadeira
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create two orgs with same email', async () => {
    const email = 'org@email.com'
    // crio dois usuários com o mesmo e-mail
    await sut.execute({
      name: 'Teste ORG',
      city: 'Test ORG City',
      phone: 'Test ORG Phone',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Teste ORG',
        city: 'Test ORG City',
        phone: 'Test ORG Phone',
        email,
        password: '123456',
      }) // espero que o retorno da promise falhe(rejects) e que o erro seja do tipo UserAlreadyExistsError
    }).rejects.toBeInstanceOf(ORGAlreadyExistsError)
  })

  it('should not be able to create two orgs with same phone', async () => {
    const phone = 'test phone'
    // crio dois usuários com o mesmo e-mail
    await sut.execute({
      name: 'Teste ORG',
      city: 'Test ORG City',
      phone,
      email: 'org@email.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Teste ORG',
        city: 'Test ORG City',
        phone,
        email: 'org@email.com',
        password: '123456',
      }) // espero que o retorno da promise falhe(rejects) e que o erro seja do tipo UserAlreadyExistsError
    }).rejects.toBeInstanceOf(ORGAlreadyExistsError)
  })
})
