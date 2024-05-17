import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/server';

import { HealthCheck } from '../healthCheckModel';

describe('Health Check API endpoints', () => {
  it('GET / - success', async () => {
    const response = await request(app).get('/health-check');
    const result: HealthCheck = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toEqual(true);
    expect(result.message).toEqual('Service is healthy');
  });
});
