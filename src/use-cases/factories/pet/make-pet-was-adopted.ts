import { PrismaPetsRepository } from '@/repositories/prisma-repositories/prisma-pet-repository'
import { PetWasAdoptedUseCase } from '@/use-cases/pet/pet-was-adopted'

export const makePetWasAdoptedUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const petWasAdoptedUseCase = new PetWasAdoptedUseCase(petsRepository)

  return petWasAdoptedUseCase
}
