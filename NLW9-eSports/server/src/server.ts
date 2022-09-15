import express from "express";
import { PrismaClient } from "@prisma/client";

const PORT = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/games", async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.send(games);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, resp) => {
  console.log("Hello, World!");

  return resp.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Running on port: http://localhost:" + PORT);
});
