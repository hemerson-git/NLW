import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class SendMailController {
    async execute(request: Request, response: Response) {
      const { email, survey_id } = request.body;

      const usersRepository = getCustomRepository(UsersRepository);
      const surveyRepository = getCustomRepository(SurveysRepository);
      const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

      const user = await usersRepository.findOne({ email });

      if(!user) {
        return response.status(400).json({ error: 'User Does Not Exists!' });
      }

      const survey = await surveyRepository.findOne({ id: survey_id })

      if(!survey) {
        return response.status(400).json({ error: 'Survey Does Not Exists!' });
      }

      const surveyUserAlreadyExists = await surveyUserRepository.findOne({
        where: [{ user_id: user.id}, { value: null }],
        relations: ["user", "survey"]
      });

      const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
      const variables = {
        name: user.name,
        title: survey.title,
        description: survey.description,
        user_id: user.id,
        link: process.env.URL_MAIL
      }
      
      if (surveyUserAlreadyExists) {
        await SendMailService.execute(email, survey.title, variables, npsPath);
        return response.json(surveyUserAlreadyExists);
      }
      
      // Salvar as informações na tabela
      const surveyUser = surveyUserRepository.create({
        user_id: user.id,
        survey_id
      });

      await surveyUserRepository.save(surveyUser);

      // Enviar o email para o usuário
      await SendMailService.execute(email, survey.title, variables, npsPath);

      return response.json(surveyUser);
    }
}

export default SendMailController;
