"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("config/env");
const app_1 = require("infrastructure/api/express/app");
const logger_1 = require("utils/logger");
async function startServer() {
    try {
        const port = env_1.ENV.APPLICATION.PORT;
        const host = env_1.ENV.APPLICATION.HOST;
        app_1.app.listen(port, host, () => {
            logger_1.logger.log("info", (0, logger_1.loggerMessage)({
                message: `App running at port ${port}`,
            }));
        });
    }
    catch (error) {
        logger_1.logger.log("error", (0, logger_1.loggerMessage)({
            message: 'Failed to start the server.',
        }));
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map