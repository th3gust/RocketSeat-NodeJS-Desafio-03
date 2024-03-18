import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { PetWasAdoptedUseCase } from './pet-was-adopted'

let petRegister: InMemoryPetsRepository
let sut: PetWasAdoptedUseCase

describe('Pet was adopted Use Case', () => {
  beforeEach(() => {
    petRegister = new InMemoryPetsRepository()
    sut = new PetWasAdoptedUseCase(petRegister)
  })

  it('should be able to adopt a pet', async () => {
    const pet = await petRegister.create({
      details: ['test'],
      traits: ['test'],
      org_id: 'org_id',
      name: 'Pet Deer',
      city: 'Test City',
    })

    const adoptedPet = await sut.execute({ petId: pet.id })

    expect(adoptedPet.pet).toEqual(
      expect.objectContaining({ name: 'Pet Deer' }),
    )
  })
})
