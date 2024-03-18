import { makePetRegisterUseCase } from '@/use-cases/factories/pet/make-pet-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const petRegister = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const createPetRegisterParamsSchema = z.object({
    orgId: z.string(),
  })

  const createPetRegisterBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    details: z.string().array(),
    traits: z.string().array(),
  })

  const { orgId } = createPetRegisterParamsSchema.parse(request.params)

  const { name, city, details, traits } = createPetRegisterBodySchema.parse(
    request.body,
  )

  const petsRegisterUseCase = makePetRegisterUseCase()

  await petsRegisterUseCase.execute({
    name,
    city,
    details,
    traits,
    org_id: orgId,
  })

  return reply.status(201).send()
}
