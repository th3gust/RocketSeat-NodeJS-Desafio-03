import { FastifyInstance } from 'fastify'
import { petRegister } from './register-pet'
import { petWasAdopted } from './pet-was-adopted'
import { getPetById } from './get-pet-by-id'
import { fetchByTraits } from './fetch-by-traits'
import { fetchByCity } from './fetch-by-city'

export const petRoutes = async (app: FastifyInstance) => {
  app.post('/register/:orgId', petRegister)
  app.patch('/adopted/:petId', petWasAdopted)
  app.get('/find/:id', getPetById)
  app.get('/find/traits', fetchByTraits)
  app.get('/find/city', fetchByCity)
}
