import { makeFetchByTraitsUseCase } from '@/use-cases/factories/pet/make-fetch-by-traits'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const fetchByTraits = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const petTraitsQuerySchema = z.object({
    trait: z.string().array(),
  })

  const { trait } = petTraitsQuerySchema.parse(request.query)

  const fetchByTraitsUseCase = makeFetchByTraitsUseCase()

  const pet = await fetchByTraitsUseCase.execute(trait)

  return reply.status(200).send(pet)
}
