import Fastify from 'fastify'

import cors from '@fastify/cors'
import 'dotenv/config'
import jwt from '@fastify/jwt'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = Fastify()

app.register(cors, {
  origin: true,
})

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

if (process.env.JWT_SECRET)
  app.register(jwt, {
    secret: process.env.JWT_SECRET,
  })

// ROUTES
app.register(multipart)
app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log(`server running on port 3333`)
})
