import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/interfaces/OrgsRepository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateORGUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateORGUseCaseReply {
  org: Org
}

export class AuthenticateORGUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateORGUseCaseRequest): Promise<AuthenticateORGUseCaseReply> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
