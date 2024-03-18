import { PrismaPetsRepository } from '@/repositories/prisma-repositories/prisma-pet-repository'
import { RegisterPetUseCase } from '@/use-cases/pet/register'

export const makePetRegisterUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const petsRegisterUseCase = new RegisterPetUseCase(petsRepository)

  return petsRegisterUseCase
}
