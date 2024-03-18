import { PrismaOrgsRepository } from '@/repositories/prisma-repositories/prisma-orgs-repository'
import { RegisterUserUseCase } from '@/use-cases/user/register'

export const makeRegisterUserUseCase = () => {
  const orgRegister = new PrismaOrgsRepository()
  const registerUserUseCase = new RegisterUserUseCase(orgRegister)

  return registerUserUseCase
}
