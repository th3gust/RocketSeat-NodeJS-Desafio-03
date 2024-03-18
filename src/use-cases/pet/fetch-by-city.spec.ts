import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { FetchByCityUseCase } from './fetch-by-city'

let petRegister: InMemoryPetsRepository
let sut: FetchByCityUseCase

describe('Fetch pets by traits Use Case', () => {
  beforeEach(() => {
    petRegister = new InMemoryPetsRepository()
    sut = new FetchByCityUseCase(petRegister)
  })

  it('should be able to fetch pets by traits', async () => {
    const traitsArr = ['test1', 'test2', 'test3', 'test4', 'test5']

    for (let i = 1; i <= 20; i++) {
      await petRegister.create({
        details: ['test'],
        traits: ['test', 'another_test'],
        org_id: 'org_id',
        name: 'Pet Deer',
        city: `${traitsArr[Math.round(i / 5)]} City`,
      })
    }

    const { pets } = await sut.execute({
      city: 'test1 City',
    })

    expect(pets).toHaveLength(2)
  })
})
