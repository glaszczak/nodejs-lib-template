import packageJson from '@root/package.json';
import { LogCode } from 'enums';
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/check/ping', async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            v: packageJson.version,
        });
    } catch (error: any) {
        res.status(error.statusCode || 500).json(error.response);
    }
});

router.get('*', (_, res) => res.status(404).json({ code: LogCode.CODE_G003 }));

export default router;
