import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

// UTILS

import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    res.send(games);
  } catch (err) {
    console.log(err);
  }
});

app.get("/ads", async (req, res) => {
  const ads = await prisma.ad.findMany();
  res.json(ads);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const { body }: any = req;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying.toString(),
      discord: body.discord,
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      hourStart: convertHourStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays.join(","),
    },
  });

  return res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      hourStart: true,
      hourEnd: true,
      yearsPlaying: true,
    },

    where: {
      gameId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const parsedAds = ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  });

  return res.json(parsedAds);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },

    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

app.get("/", (req, resp) => {
  console.log("Hello, World!");

  return resp.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Running on port: http://localhost:" + PORT);
});
