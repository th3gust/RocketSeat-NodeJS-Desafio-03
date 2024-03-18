import { InMemoryUsersRepository } from '@/repositories/in-memory-repositories/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

// criando as variáveis e dizendo a tipagem delas
let userRegister: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    // antes de cada teste a variável sut recebe uma instância da classe RegisterUseCase com o repositório do InMemoryUserRepository, assim qualquer método do this.usersRepository do InMemory agora virará userRegister
    userRegister = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(userRegister)
  })

  it('should be able to register a user', async () => {
    // criar um usuário

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    // cria um usuário
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    // como é para validar o hash criamos outra senha igual com hash e vemos se vai ficar igual a senha do usuário
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    // espero que a comparação da constante seja verdadeira
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create two users with same email', async () => {
    const email = 'johndoe@email.com'
    // crio dois usuários com o mesmo e-mail
    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }) // espero que o retorno da promise falhe(rejects) e que o erro seja do tipo UserAlreadyExistsError
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
