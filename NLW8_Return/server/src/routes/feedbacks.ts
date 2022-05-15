import express from "express";
import { prisma } from "../prisma";
import nodemailer from "nodemailer";

import { PrismaFeedbacksRepositories } from "../repositories/prisma/prisma-feedback-repositories";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";

export const feedbackRoutes = express.Router();

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
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
