import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(),
        }),
        params: z.object({
          tripId: z.string(),
        }),
      },
    },
    async (req) => {
      const { occurs_at, title } = req.body;
      const { tripId } = req.params;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new Error("Trip not Found!");
      }

      if (dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new Error("Invalid activity date.");
      }

      if (dayjs(occurs_at).isAfter(trip.ends_at)) {
        throw new Error("Invalid activity date.");
      }

      const newTrip = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId,
        },
      });

      return {
        id: newTrip.id,
        occurs_at: newTrip.occurs_at,
        title: newTrip.title,
      };
    }
  );
}
