import { Request, Response } from 'express';

import { getRepository } from "typeorm";
import { Survey } from "../models/Survey";

class SurveyController {
  async index(request: Request, response: Response) {
    const surveyRepository = getRepository(Survey);

    const surveys = surveyRepository.find();

    return response.json(surveys);
  }

  async create(request: Request, response: Response) {
    const surveyRepository = getRepository(Survey);

    const { title, description } = request.body;

    const survey = surveyRepository.create({ title, description });

    const newSurvey =  await surveyRepository.save(survey);

    return response.status(201).json(newSurvey);
  }
}

export { SurveyController }
