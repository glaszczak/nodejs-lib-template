"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.loggerMessage = void 0;
const loggerMessage = (data) => data;
exports.loggerMessage = loggerMessage;
class ApiError extends Error {
    statusCode;
    response;
    additionalData;
    constructor(data) {
        super();
        this.name = data.name || this.name;
        this.message = data.message || '';
        this.statusCode = data?.statusCode || 500;
        this.additionalData = data.additionalData || undefined;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
        switch (this.statusCode) {
            case 400:
                this.response = data.response || {
                    message: 'Bad request',
                    code: "CODE_G001",
                };
                break;
            case 401:
                this.response = data.response || {
                    message: 'Unauthorized',
                    code: "CODE_G002",
                };
                break;
            case 403:
                this.response = data.response || {
                    message: 'Forbidden',
                    code: "CODE_G006",
                };
                break;
            case 404:
                this.response = data.response || {
                    message: 'Not Found',
                    code: "CODE_G003",
                };
                break;
            case 409:
                this.response = data.response || {
                    message: 'Conflict',
                    code: "CODE_G004",
                };
                break;
            default:
                this.response = data.response || {
                    message: 'Internal Server Error',
                    code: "CODE_G005",
                };
        }
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map