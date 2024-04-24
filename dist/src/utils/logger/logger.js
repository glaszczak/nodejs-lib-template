"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const env_1 = require("config/env");
const fs_1 = require("fs");
const path_1 = require("path");
const winston_1 = require("winston");
const transport_1 = __importDefault(require("winston-transport-sentry-node/dist/transport"));
const { printf, combine, timestamp } = winston_1.format;
const enabledTransports = [];
const packageJSON = JSON.parse((0, fs_1.readFileSync)((0, path_1.resolve)('package.json')).toString());
const customFormat = printf((data) => {
    if (data.source == 'express') {
        return `[${data.timestamp}] [${env_1.ENV.APPLICATION.NAME}] [exp] [${data.level}] ${data.message}`;
    }
    if (data.error !== null && data.error instanceof Error) {
        data.error = {
            message: data.error.message,
            stack: data.error.stack,
        };
    }
    return `[${data.timestamp}] [${env_1.ENV.APPLICATION.NAME}] [${data.level}] [${data.requestId || ''}] [${env_1.ENV.NODE.ENVIRONMENT === 'development' ? JSON.stringify(data, null, 4) : JSON.stringify(data)}]`;
});
const ignorePrivate = (0, winston_1.format)((data) => {
    if (data.private) {
        return false;
    }
    return data;
});
if (env_1.ENV.WINSTON.CONSOLE_ENABLED) {
    enabledTransports.push(new winston_1.transports.Console({
        level: "info",
        handleExceptions: true,
    }));
}
if (env_1.ENV.WINSTON.TRANSPORT_FILE_PATH) {
    enabledTransports.push(new winston_1.transports.File({
        handleExceptions: true,
        filename: env_1.ENV.WINSTON.TRANSPORT_FILE_PATH,
    }));
}
if (env_1.ENV.WINSTON.TRANSPORT_SENTRY_DSN) {
    enabledTransports.push(new transport_1.default({
        sentry: {
            normalizeDepth: 10,
            dsn: env_1.ENV.WINSTON.TRANSPORT_SENTRY_DSN,
            environment: env_1.ENV.NODE.ENVIRONMENT,
            release: `${packageJSON.name}@${packageJSON.version}`,
        },
        level: "error",
    }));
}
const logger = (0, winston_1.createLogger)({
    format: combine(timestamp(), winston_1.format.splat(), ignorePrivate(), customFormat),
    transports: enabledTransports,
    exitOnError: true,
});
exports.logger = logger;
logger.expressStream = {
    write: (message) => {
        logger.log({
            level: "info",
            source: 'express',
            handleExceptions: true,
            message: message.substring(0, message.lastIndexOf('\n')),
        });
    },
};
//# sourceMappingURL=logger.js.map