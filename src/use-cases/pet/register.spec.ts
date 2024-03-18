import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { RegisterPetUseCase } from './register'

// criando as variáveis e dizendo a tipagem delas
let petRegister: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    // antes de cada teste a variável sut recebe uma instância da classe RegisterUseCase com o repositório do InMemoryUserRepository, assim qualquer método do this.usersRepository do InMemory agora virará petRegister
    petRegister = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petRegister)
  })

  it('should be able to register a pet', async () => {
    // criar um usuário

    const { pet } = await sut.execute({
      details: ['test'],
      traits: ['test'],
      org_id: 'org_id',
      name: 'Pet Deer',
      city: 'Test City',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
