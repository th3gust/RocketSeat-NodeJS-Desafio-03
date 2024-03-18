import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/interfaces/PetsRepository'

interface RegisterPetUseCaseRequest {
  details: string[]
  traits: string[]
  org_id: string
  name: string
  city: string
}

interface RegisterPetUseCaseReply {
  pet: Pet
}

export class RegisterPetUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    details,
    traits,
    org_id,
    name,
    city,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseReply> {
    const pet = await this.petsRepository.create({
      details,
      traits,
      org_id,
      name,
      city,
    })

    if (!pet) {
      throw new Error()
    }

    return { pet }
  }
}
