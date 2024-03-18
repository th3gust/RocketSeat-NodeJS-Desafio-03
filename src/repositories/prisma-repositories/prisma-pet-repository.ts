import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../interfaces/PetsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findByTraits(trait: string) {
    const pets = await prisma.pet.findMany({
      where: { traits: { has: trait } },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({ where: { id: data.id }, data })

    return pet
  }

  async findByCity(city: string) {
    const pets = await prisma.pet.findMany({ where: { city } })

    return pets
  }
}
