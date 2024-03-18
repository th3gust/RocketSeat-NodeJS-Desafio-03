import { makeFetchByCityUseCase } from '@/use-cases/factories/pet/make-fetch-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const fetchByCity = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const petCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = petCityQuerySchema.parse(request.query)

  const fetchByCityUseCase = makeFetchByCityUseCase()

  const pet = await fetchByCityUseCase.execute({ city })

  return reply.status(200).send(pet)
}
