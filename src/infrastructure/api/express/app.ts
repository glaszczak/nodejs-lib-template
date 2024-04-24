import express from 'express';
import helmet from 'helmet';
import routes from 'infrastructure/routes/router';

const app = express();

app.use(express.json());

app.use(helmet());

app.use('/api', routes);

export { app };
