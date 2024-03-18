import { makeGetPetByIdUseCase } from '@/use-cases/factories/pet/make-get-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getPetById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const petIdQuerySchema = z.object({
    id: z.string(),
  })

  const { id } = petIdQuerySchema.parse(request.query)

  const getPetByIdUseCase = makeGetPetByIdUseCase()

  const pet = await getPetByIdUseCase.execute({ id })

  return reply.status(200).send(pet)
}
