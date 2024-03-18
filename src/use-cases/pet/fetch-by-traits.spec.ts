import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { FetchByTraitsUseCase } from './fetch-by-traits'

let petRegister: InMemoryPetsRepository
let sut: FetchByTraitsUseCase

describe('Fetch pets by traits Use Case', () => {
  beforeEach(() => {
    petRegister = new InMemoryPetsRepository()
    sut = new FetchByTraitsUseCase(petRegister)
  })

  it('should be able to fetch pets by traits', async () => {
    const traitsArr = ['test1', 'test2', 'test3', 'test4', 'test5']

    for (let i = 1; i <= 20; i++) {
      await petRegister.create({
        details: ['test'],
        traits: ['test', 'another_test', traitsArr[Math.round(i / 5)]],
        org_id: 'org_id',
        name: 'Pet Deer',
        city: 'Test City',
      })
    }

    const { pets } = await sut.execute({
      trait: 'test1',
    })

    expect(pets).toHaveLength(2)
    // TENTAR COLOCAR O EXPECT PARA O RESULTADO POSTERIORMENTE
  })
})
