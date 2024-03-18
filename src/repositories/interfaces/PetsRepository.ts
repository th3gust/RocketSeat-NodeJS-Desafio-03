import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  // o Unchecked não conta com a linha responsável pelo vínculo com a ORG
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByTraits(trait: string): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  save(pet: Pet): Promise<Pet>
  findByCity(city: string): Promise<Pet[] | null>
}
