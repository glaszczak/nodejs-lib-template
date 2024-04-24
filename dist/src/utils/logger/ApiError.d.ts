import { Logger } from 'types';
export declare const loggerMessage: (data: Logger.LoggerMessage) => Logger.LoggerMessage;
export declare class ApiError extends Error {
    private readonly statusCode;
    private readonly response;
    private readonly additionalData;
    constructor(data: Logger.FormLogger);
}
