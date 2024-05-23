import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import request from 'supertest';

import { env } from '@/common/utils/envConfig';
import { app } from '@/server';

import { ClassyCampaignOverview } from '../campaignModel';

describe('Campaign API endpoints', () => {
  describe('GET /campaigns/:campaignId/progress endpoint', () => {
    const campaignId = 1234;

    it('success', async () => {
      const server = setupServer(
        http.post(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, () => {
          return HttpResponse.json({
            access_token: '123token',
          });
        }),
        http.get(`${env.CLASSY_API_BASE_URL}/2.0/campaigns/${campaignId}/overview`, () => {
          return HttpResponse.json({
            gross_amount: 120.4,
          });
        })
      );

      server.listen();

      const response = await request(app).get(`/campaigns/${campaignId}/progress`);
      const result: { success: true; payload: ClassyCampaignOverview } = response.body;

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toEqual(true);
      expect(result.payload).toBeTypeOf('object');
      expect(result.payload).toEqual({ gross_amount: 120.4 });

      server.close();
    });

    it('Classy auth fails', async () => {
      const server = setupServer(
        http.post(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, () => {
          return HttpResponse.json({
            error: 'Failed to connect to Classy',
          });
        })
      );

      server.listen();

      const response = await request(app).get(`/campaigns/${campaignId}/progress`);
      const result: { success: false; message: string; statusCode: number } = response.body;

      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toEqual(false);
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toEqual('The authentication with Classy failed.');

      server.close();
    });

    it('Class campaign overview fetch fails', async () => {
      const server = setupServer(
        http.post(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, () => {
          return HttpResponse.json({
            access_token: '123token',
          });
        }),
        http.get(`${env.CLASSY_API_BASE_URL}/2.0/campaigns/${campaignId}/overview`, () => {
          return HttpResponse.json({
            error: 'Failed to retrieve aggregates',
          });
        })
      );

      server.listen();

      const response = await request(app).get(`/campaigns/${campaignId}/progress`);
      const result: { success: false; message: string; statusCode: number } = response.body;

      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toEqual(false);
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.message).toEqual('Failed to retrieve aggregates for campaign 1234');

      server.close();
    });
  });
});
