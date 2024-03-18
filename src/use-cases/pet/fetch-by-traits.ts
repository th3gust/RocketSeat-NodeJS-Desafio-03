import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/interfaces/PetsRepository'

interface FetchByTraitsUseCaseRequest {
  trait: string
}

interface FetchByTraitsUseCaseReply {
  pets: Pet[]
}

export class FetchByTraitsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    trait,
  }: FetchByTraitsUseCaseRequest): Promise<FetchByTraitsUseCaseReply> {
    const pets = await this.petsRepository.findByTraits(trait)

    return pets
  }
}
