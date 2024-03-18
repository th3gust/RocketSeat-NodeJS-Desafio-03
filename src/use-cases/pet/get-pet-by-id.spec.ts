import { PetsRepository } from '@/repositories/interfaces/PetsRepository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { InMemoryPetsRepository } from '@/repositories/in-memory-repositories/in-memory-pets-repository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

let petsRepository: PetsRepository
let sut: GetPetByIdUseCase

describe('Get pet by id use case', async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    await petsRepository.create({
      details: ['test'],
      traits: ['test'],
      org_id: 'org_id',
      name: 'Pet Deer',
      id: 'pet-id-test',
      city: 'Test City',
    })

    const { pet } = await sut.execute({ id: 'pet-id-test' })

    expect(pet.name).toEqual('Pet Deer')
  })

  it('should not be able to get a pet with inexistent id', async () => {
    await petsRepository.create({
      details: ['test'],
      traits: ['test'],
      org_id: 'org_id',
      name: 'Pet Deer',
      id: 'pet-id-test',
      city: 'Test City',
    })

    expect(async () => {
      await sut.execute({ id: 'pet-id-not-found' })
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
