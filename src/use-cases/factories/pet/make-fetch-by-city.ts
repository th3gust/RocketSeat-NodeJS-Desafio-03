import { PrismaPetsRepository } from '@/repositories/prisma-repositories/prisma-pet-repository'
import { FetchByCityUseCase } from '@/use-cases/pet/fetch-by-city'

export const makeFetchByCityUseCase = () => {
  const petsRepository = new PrismaPetsRepository()
  const fetchByCityUseCase = new FetchByCityUseCase(petsRepository)

  return fetchByCityUseCase
}
