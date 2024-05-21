import cors from 'cors';
import express, { Express } from 'express';

import { campaignRouter } from '@/api/campaign/campaignRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/campaigns', campaignRouter);

export { app };
