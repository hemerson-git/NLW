import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (req, res) => {
      const { tripId } = req.params;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          activities: true,
        },
      });

      if (!trip) {
        throw new Error("Trip not found!");
      }

      const diffInDaysBetweenTripStartEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        "days"
      );

      const activities = Array.from({
        length: diffInDaysBetweenTripStartEnd + 1,
      });

      return trip.activities;
    }
  );
}
