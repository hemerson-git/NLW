import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/hemerson-dev.png",
      googleId: "123412341234",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example Poll",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T12:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,

          participant: {
            connect: {
              userId_pollId: {
                pollId: poll.id,
                userId: user.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
