import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { getFormattedEmailDate } from "../utils/format_trip_start";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, response) => {
      const { tripId } = request.params;
      const { email } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          participants: true,
        },
      });

      if (!trip) {
        throw new ClientError("Trip not Found!");
      }

      const participant = await prisma.participant.create({
        data: {
          email,
          trip_id: tripId,
        },
      });

      const formattedStartDate = getFormattedEmailDate(trip.starts_at);
      const formattedEndDate = getFormattedEmailDate(trip.ends_at);

      const mail = await getMailClient();

      const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`;

      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "oi@plann.er",
        },
        to: participant.email,
        subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}`,
        html: `
              <div>
                <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
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

      response.send({
        id: participant.id,
      });
    }
  );
}
