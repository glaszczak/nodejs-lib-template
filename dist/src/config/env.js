"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const zod_1 = require("zod");
const toBoolean = (val) => {
    if (typeof val === 'string') {
        return val === 'true';
    }
    return false;
};
const envSchema = zod_1.z.object({
    NODE: zod_1.z.object({
        ENVIRONMENT: zod_1.z.string().default('development'),
    }),
    APPLICATION: zod_1.z.object({
        HOST: zod_1.z.string().default('0.0.0.0'),
        PORT: zod_1.z.number().default(3000),
        NAME: zod_1.z.string(),
    }),
    WINSTON: zod_1.z.object({
        CONSOLE_ENABLED: zod_1.z.preprocess(toBoolean, zod_1.z.boolean()),
        TRANSPORT_FILE_PATH: zod_1.z.string(),
        TRANSPORT_SENTRY_DSN: zod_1.z.string(),
    }),
});
exports.ENV = envSchema.parse({
    NODE: {
        ENVIRONMENT: process.env.NODE_ENV,
    },
    APPLICATION: {
        HOST: process.env.APPLICATION_HOST,
        PORT: process.env.APPLICATION_PORT ? parseInt(process.env.APPLICATION_PORT, 10) : undefined,
        NAME: process.env.APPLICATION_NAME,
    },
    WINSTON: {
        CONSOLE_ENABLED: process.env.WINSTON_CONSOLE_ENABLED,
        TRANSPORT_FILE_PATH: process.env.WINSTON_TRANSPORT_FILE_PATH,
        TRANSPORT_SENTRY_DSN: process.env.WINSTON_TRANSPORT_SENTRY_DSN,
    },
});
//# sourceMappingURL=env.js.map