import { PetsRepository } from '@/repositories/interfaces/PetsRepository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface GetPetByIdUseCaseRequest {
  id: string
}

interface GetPetByIdUseCaseReply {
  pet: Pet
}

export class GetPetByIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseReply> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    // tentar resolver para fazer que o retorno seja o details de pet
    return { pet }
  }
}
