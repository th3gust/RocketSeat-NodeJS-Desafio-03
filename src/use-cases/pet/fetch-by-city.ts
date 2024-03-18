import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/interfaces/PetsRepository'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface FetchByCityUseCaseRequest {
  city: string
}

interface FetchByCityUseCaseReply {
  pets: Pet[]
}

export class FetchByCityUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchByCityUseCaseRequest): Promise<FetchByCityUseCaseReply> {
    const pets = await this.petsRepository.findByCity(city)

    if (!pets) {
      throw new PetNotFoundError()
    }

    return { pets }
  }
}
