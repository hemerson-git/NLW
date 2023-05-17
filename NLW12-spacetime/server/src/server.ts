import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const users = await prisma.user.findMany()
  return users
})

app.listen({ port: 3333 }).then(() => {
  console.log(`server running on port 3333`)
})
