import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory-repositories/in-memory-orgs-repository'
import { AuthenticateORGUseCase } from './authenticate'

// criando as variáveis e dizendo a tipagem delas
let orgAuthenticate: InMemoryOrgsRepository
let sut: AuthenticateORGUseCase

describe('Register ORG Use Case', () => {
  beforeEach(() => {
    // antes de cada teste a variável sut recebe uma instância da classe RegisterUseCase com o repositório do InMemoryUserRepository, assim qualquer método do this.usersRepository do InMemory agora virará userRegister
    orgAuthenticate = new InMemoryOrgsRepository()
    sut = new AuthenticateORGUseCase(orgAuthenticate)
  })

  it('should be able to authenticate a org', async () => {
    // criar um usuário

    await orgAuthenticate.create({
      name: 'Teste ORG',
      phone: 'Test ORG Phone',
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'org@email.com',
      password: '123456',
    })

    expect(org.email).toEqual('org@email.com')
  })
})
