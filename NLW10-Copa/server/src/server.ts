import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { env } from "process";

// ROUTES
import { pollRoutes } from "./routes/polls";
import { gameRoutes } from "./routes/game";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: env.SECRET_KEY,
  });

  await fastify.register(pollRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port: 3333 });
}

bootstrap();
