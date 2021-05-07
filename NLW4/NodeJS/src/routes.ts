import { Router } from 'express';
import SendMailController from './controllers/SendMailController';

import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.get('/users', userController.index);
router.get('/users/:id', userController.show);

router.get('/surveys', surveysController.index);
router.get('/surveys/:id', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/send-mail', sendMailController.execute);

export { router };
