import { ENV } from 'config/env';
import { LoggerLevel } from 'enums';
import { app } from 'infrastructure/api/express/app';
import { logger, loggerMessage } from 'utils/logger';

async function startServer() {
    try {
        const port = ENV.APPLICATION.PORT;
        const host = ENV.APPLICATION.HOST;

        app.listen(port, host, () => {
            logger.log(
                LoggerLevel.INFO,
                loggerMessage({
                    message: `App running at port ${port}`,
                }),
            );
        });
    } catch (error) {
        logger.log(
            LoggerLevel.ERROR,
            loggerMessage({
                message: 'Failed to start the server.',
            }),
        );
        process.exit(1);
    }
}

startServer();
