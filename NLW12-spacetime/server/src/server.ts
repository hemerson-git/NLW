import Fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = Fastify()

app.register(cors, {
  origin: true,
})
app.register(memoriesRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log(`server running on port 3333`)
})
