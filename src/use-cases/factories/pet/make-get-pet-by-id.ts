import { PrismaPetsRepository } from '@/repositories/prisma-repositories/prisma-pet-repository'
import { GetPetByIdUseCase } from '@/use-cases/pet/get-pet-by-id'

export const makeGetPetByIdUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

  return getPetByIdUseCase
}
