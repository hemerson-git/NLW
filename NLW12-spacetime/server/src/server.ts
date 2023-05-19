import Fastify from 'fastify'

import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = Fastify()

app.register(cors, {
  origin: true,
})

if (process.env.JWT_SECRET)
  app.register(jwt, {
    secret: process.env.JWT_SECRET,
  })

// ROUTES
app.register(memoriesRoutes)
app.register(authRoutes)

app.listen({ port: 3335 }).then(() => {
  console.log(`server running on port 3333`)
})
