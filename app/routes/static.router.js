import { Router } from 'express';
import { StaticFilesController } from '../controllers/static.controller.js';

export const staticFilesRouter = Router();

staticFilesRouter.get('/:folder/:file', StaticFilesController.firstLevelStaticFile);
staticFilesRouter.get('/:folder/:subfolder/:file', StaticFilesController.secondLevelStaticFile);
