import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../interfaces/OrgsRepository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  // criar um novo usuário
  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findByPhone(phone: string) {
    const org = this.items.find((item) => item.phone === phone)

    if (!org) {
      return null
    }

    return org
  }
}
