import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/user/make-register-user-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = registerUserBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterUserUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
