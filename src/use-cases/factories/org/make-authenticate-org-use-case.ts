import { PrismaOrgsRepository } from '@/repositories/prisma-repositories/prisma-orgs-repository'
import { AuthenticateORGUseCase } from '@/use-cases/org/authenticate'

export const makeAuthenticateOrgUseCase = () => {
  const orgRegister = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateORGUseCase(orgRegister)

  return authenticateOrgUseCase
}
