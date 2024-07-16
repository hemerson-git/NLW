import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/links",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { tripId } = req.params;

      const activities = await prisma.activity.findMany({
        where: {
          trip_id: tripId,
        },
      });

      if (!activities) {
        throw new Error("No activities found!");
      }
    }
  );
}
