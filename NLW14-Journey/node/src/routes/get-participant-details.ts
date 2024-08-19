import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        select: {
          email: true,
          id: true,
          name: true,
          is_confirmed: true,
        },
        where: { id: participantId },
      });

      if (!participant) {
        throw new ClientError("Participant not found!");
      }

      response.send({
        participant,
      });
    }
  );
}
