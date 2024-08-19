import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function createLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/links",
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
        params: z.object({
          tripId: z.string(),
        }),
      },
    },
    async (req) => {
      const { url, title } = req.body;
      const { tripId } = req.params;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new ClientError("Trip not Found!");
      }

      const newLink = await prisma.link.create({
        data: {
          title,
          url,
          trip_id: tripId,
        },
      });

      return {
        id: newLink.id,
      };
    }
  );
}
