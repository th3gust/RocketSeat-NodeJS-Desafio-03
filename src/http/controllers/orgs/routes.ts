import { FastifyInstance } from 'fastify'
import { registerOrg } from './register-org'
import { autheticateOrg } from './authenticate'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/register', registerOrg)
  app.post('/login', { onRequest: [verifyJWT] }, autheticateOrg)
}
