import { Logger as LoggerWinston } from 'winston';
export declare namespace Logger {
    interface Log extends LoggerWinston {
        expressStream?: {
            write: (message: string) => void;
        };
    }
    interface LoggerMessage {
        name?: string;
        message?: string;
        statusCode?: number;
        additionalData?: object | string;
        error?: any;
        errorCode?: string;
    }
    interface FormLogger extends LoggerMessage {
        response?: object;
        message?: string;
    }
}
