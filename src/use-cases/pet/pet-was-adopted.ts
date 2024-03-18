import { PetsRepository } from '@/repositories/interfaces/PetsRepository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from '../errors/pet-not-found-error'

interface PetWasAdoptedUseCaseRequest {
  petId: string
}
interface PetWasAdoptedUseCaseReply {
  pet: Pet
}

export class PetWasAdoptedUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: PetWasAdoptedUseCaseRequest): Promise<PetWasAdoptedUseCaseReply> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    pet.adopted = new Date()

    await this.petsRepository.save(pet)

    return { pet }
  }
}
