import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()),
        }),
      },
    },
    async (req, res) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_email,
        owner_name,
        emails_to_invite,
      } = req.body;

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new Error("Invalid trip starting date.");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new Error("Invalid trip end date.");
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            create: {
              email: owner_email,
              name: owner_name,
              is_owner: true,
              is_confirmed: true,
            },
          },
        },
      });

      const mail = await getMailClient();

      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "oi@plann.er",
        },
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: "Testando envio de e-mail",
        html: `<p>Teste do envio do e-mail</p>`,
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return res.send({
        trip: {
          id: trip.id,
          destination: trip.destination,
          starts_at: trip.starts_at,
          ends_at: trip.ends_at,
        },
      });
    }
  );
}
