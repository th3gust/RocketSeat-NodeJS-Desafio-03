import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/org/make-authenticate-org-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const autheticateOrg = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const auntheticateOrgBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = auntheticateOrgBodySchema.parse(request.body)

  try {
    const auntheticateOrgUseCase = makeAuthenticateOrgUseCase()

    const { org } = await auntheticateOrgUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(201).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
