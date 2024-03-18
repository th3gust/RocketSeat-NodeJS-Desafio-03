import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../interfaces/PetsRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    let details: string[] = []

    if (Array.isArray(data.details)) {
      details = data.details
    } else if (typeof data.details === 'string') {
      details = [data.details]
    }

    let traits: string[] = []

    if (Array.isArray(data.traits)) {
      traits = data.traits
    } else if (typeof data.traits === 'string') {
      traits = [data.traits]
    }

    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      adopted: data.adopted ? new Date(data.adopted) : null,
      details,
      traits,
      org_id: data.org_id,
      city: data.city,
    }

    this.items.push(pet)

    return pet
  }

  async findByTraits(trait: string) {
    const pets = this.items.filter((item) => item.traits.includes(trait))

    if (!pets) {
      return null
    }

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id)

    if (petIndex >= 0) {
      this.items[petIndex] = pet
    }

    return pet
  }

  async findByCity(city: string) {
    const pets = this.items.filter((item) => item.city === city)

    if (!pets) {
      return null
    }

    return pets
  }
}
