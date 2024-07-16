import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import z from "zod";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";
import { getFormattedEmailDate } from "../utils/format_trip_start";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
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
          participants: {
            where: {
              is_owner: false,
            },
          },
        },
      });

      if (!trip) {
        throw new Error("Trip not found!");
      }

      if (trip.is_confirmed)
        return res.redirect(`http://localhost:3000/trips/${trip.id}`);

      await prisma.trip.update({
        where: {
          id: tripId,
        },
        data: {
          is_confirmed: true,
        },
      });

      const { starts_at, ends_at, participants, destination } = trip;

      const formattedStartDate = getFormattedEmailDate(starts_at);
      const formattedEndDate = getFormattedEmailDate(ends_at);

      const mail = await getMailClient();

      await Promise.all(
        participants.map(async (participant) => {
          const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;

          const message = await mail.sendMail({
            from: {
              name: "Equipe plann.er",
              address: "oi@plann.er",
            },
            to: participant.email,
            subject: `Confirme sua presença na viagem para ${destination} em ${formattedStartDate}`,
            html: `
              <div>
                <p>Você foi convidado(a) para participar de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
                <p></p>
                <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
                <p></p>
                <p>
                  <a href="${confirmationLink}">
                    Confirmar presença
                  </a>
                </p>
                <p></p>
                <p>Caso esteja usando o dispositivo móvel, você também pode confirmar presença pelos aplicativos:</p>
                <p></p>
                <p>Aplicativo para iPhone</p>
                <p>Aplicativo para Android</p>
                <p></p>
                <p>
                  <small>
                    Caso você não saiba do que se trata esse e-mail ou não poderá estar presente, apenas ignore esse e-mail.
                  </small>
                </p>
              </div>
            `.trim(),
          });
          console.log(nodemailer.getTestMessageUrl(message));
        })
      );

      return res.redirect(`http://localhost:3000/trips/${tripId}`);
    }
  );
}
