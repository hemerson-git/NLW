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
    const surveyRepository = getCustomRepository(SurveysRepository);

    const { title, description } = request.body;

    const survey = surveyRepository.create({ title, description });

    const newSurvey =  await surveyRepository.save(survey);

    return response.status(201).json(newSurvey);
  }

  async show(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);
    const { id } = request.params;

    const survey = await surveyRepository.findOneOrFail(id);

    return response.json(survey);
  }
}

export { SurveyController }
