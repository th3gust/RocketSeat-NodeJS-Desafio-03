import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../interfaces/OrgsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async findByPhone(phone: string) {
    const org = await prisma.org.findUnique({ where: { phone } })

    return org
  }
}
