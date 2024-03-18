import { PrismaOrgsRepository } from '@/repositories/prisma-repositories/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../org/register'

export const makeRegisterOrgUseCase = () => {
  const orgRegister = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRegister)

  return registerOrgUseCase
}
