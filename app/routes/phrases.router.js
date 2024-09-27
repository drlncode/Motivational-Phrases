import { Router } from 'express';
import { PhrasesController } from '../controllers/phrases.controller.js';

export const phrasesRouter = Router();

phrasesRouter.get('/', PhrasesController.getPhrases);
