import { ORGAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/org/make-register-org-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerOrg = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, phone, email, password } = registerOrgBodySchema.parse(
    request.body,
  )

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      phone,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof ORGAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
