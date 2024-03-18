import { makePetWasAdoptedUseCase } from '@/use-cases/factories/pet/make-pet-was-adopted'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const petWasAdopted = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const petWasAdoptedParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = petWasAdoptedParamsSchema.parse(request.params)

  const petWasAdopted = makePetWasAdoptedUseCase()

  await petWasAdopted.execute({
    petId,
  })

  return reply.status(200).send()
}
