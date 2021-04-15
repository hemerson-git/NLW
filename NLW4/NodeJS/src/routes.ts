import { Router } from 'express';

import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveyController();

router.post('/users', userController.create);
router.get('/users', userController.index);
router.get('/users/:id', userController.show);

router.get('/surveys', surveysController.index);
router.get('/surveys/:id', surveysController.show);
router.post('/surveys', surveysController.create);

export { router };
