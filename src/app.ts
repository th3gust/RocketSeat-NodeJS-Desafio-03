import fastify from 'fastify'
import { orgRoutes } from './http/controllers/orgs/routes'
import { userRoutes } from './http/controllers/users/routes'
import { petRoutes } from './http/controllers/pets/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(userRoutes, { prefix: '/user' })
app.register(orgRoutes, { prefix: '/org' })
app.register(petRoutes, { prefix: '/pet' })
