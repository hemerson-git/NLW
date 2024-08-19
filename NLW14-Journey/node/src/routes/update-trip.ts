import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request, response) => {
      const { tripId } = request.params;
      const { destination, ends_at, starts_at } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new Error("Trip not found!");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new Error("Invalid end date!");
      }

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new Error("Invalid start date!");
      }

      const updatedTrip = await prisma.trip.update({
        where: { id: tripId },
        data: {
          destination,
          starts_at,
          ends_at,
        },
      });

      response.send({ id: updatedTrip.id });
    }
  );
}
