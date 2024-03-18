import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findByPhone(phone: string): Promise<Org | null>
  // Seria bom tentar posteriormente fazer um findBy e colocar email e phone como parâmetros, já que as duas funções vão ficar idênticas.
}
