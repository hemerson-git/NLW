import express from "express";
import { prisma } from "../prisma";
import nodemailer from "nodemailer";

import { PrismaFeedbacksRepositories } from "../repositories/prisma/prisma-feedback-repositories";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";

export const feedbackRoutes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

feedbackRoutes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  const prismaFeedbackRepository = new PrismaFeedbacksRepositories();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //   from: "Equipe Feedget <oi@feedget.com>",
  //   to: "Hemerson Oliveira <hemersoniasd@gmail.com>",
  //   subject: "Novo feedback",
  //   html: [
  //     `<div style={font-family: "sans-serif; font-size: 16px; color: #222;"}>`,
  //     `<p>Tipo do feedback: ${type}`,
  //     `<p> Comentário: ${comment}`,
  //     `</div>`,
  //   ].join("\n"),
  // });

  return res.status(201).send();
});
