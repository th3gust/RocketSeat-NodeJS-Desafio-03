import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/interfaces/OrgsRepository'
import { ORGAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  phone: string
  email: string
  password: string
}

interface RegisterOrgUseCaseReply {
  org: Org
}

export class RegisterOrgUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    phone,
    email,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseReply> {
    const password_hash = await hash(password, 6)

    const orgsWithSamePhone = await this.orgsRepository.findByPhone(phone)

    if (orgsWithSamePhone) {
      throw new ORGAlreadyExistsError()
    }

    const orgsWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgsWithSameEmail) {
      throw new ORGAlreadyExistsError()
    }

    // construindo o usuário
    const org = await this.orgsRepository.create({
      name,
      phone,
      email,
      password_hash,
    })

    return { org }
  }
}
