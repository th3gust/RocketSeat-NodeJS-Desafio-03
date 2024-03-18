import { PrismaPetsRepository } from '@/repositories/prisma-repositories/prisma-pet-repository'
import { FetchByTraitsUseCase } from '@/use-cases/pet/fetch-by-traits'

export const makeFetchByTraitsUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const fetchByTraitsUseCase = new FetchByTraitsUseCase(petsRepository)

  return fetchByTraitsUseCase
}
