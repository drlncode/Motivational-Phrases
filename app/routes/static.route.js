import { Router } from 'express';
import { StaticFilesController } from '../controllers/static.controller.js';

export const staticFiles = Router();

staticFiles.get('/:folder/:file', StaticFilesController.firstLevelStaticFile);
staticFiles.get('/:folder/:subfolder/:file', StaticFilesController.secondLevelStaticFile);
