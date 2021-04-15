import { Request, Response } from 'express';

import { getCustomRepository, getRepository } from "typeorm";
import { Survey } from "../models/Survey";

import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  async index(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveyRepository.find();

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
