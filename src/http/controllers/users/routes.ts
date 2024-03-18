import { FastifyInstance } from 'fastify'
import { registerUser } from './register-user'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/register', registerUser)
}
