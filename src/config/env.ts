import { z } from 'zod';

const toBoolean = (val: unknown): boolean => {
    if (typeof val === 'string') {
        return val === 'true';
    }
    return false;
};

const envSchema = z.object({
    NODE: z.object({
        ENVIRONMENT: z.string().default('development'),
    }),
    APPLICATION: z.object({
        HOST: z.string().default('0.0.0.0'),
        PORT: z.number().default(3000),
        NAME: z.string(),
    }),
    WINSTON: z.object({
        CONSOLE_ENABLED: z.preprocess(toBoolean, z.boolean()),
        TRANSPORT_FILE_PATH: z.string(),
        TRANSPORT_SENTRY_DSN: z.string(),
    }),
});

export const ENV = envSchema.parse({
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
