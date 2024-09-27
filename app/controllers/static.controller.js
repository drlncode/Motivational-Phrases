import { access, constants } from 'node:fs/promises';
import path from 'node:path';
import { __dirname } from '../utils/dirname.js';

export class StaticFilesController {
    static async firstLevelStaticFile(req, res, next) {
        const { folder, file } = req.params;
        const filePath = path.join(__dirname, `../../public/${folder}`, file);

        try {
            await access(filePath, constants.F_OK);
            res.sendFile(filePath);
        } catch (error) {
            if (error) {
                next(error);
            }
        }
    }

    static async secondLevelStaticFile(req, res, next) {
        const { folder, subfolder, file } = req.params;
        const filePath = path.join(__dirname, `../../public/${folder}/${subfolder}`, file);

        try {
            await access(filePath, constants.F_OK);
            res.sendFile(filePath);
        } catch (error) {
            if (error) {
                next(error);
            }
        }
    }
}
