import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ClassyErrorResponse } from '@/common/types/auth';
import { auth } from '@/common/utils/classyAuth';
import { env } from '@/common/utils/envConfig';

import { ClassyCampaignOverview } from './campaignModel';

const validateOverviewResponse = async (campaignId: number, response: globalThis.Response) => {
  const payload = await response.json();

  if ((payload as ClassyErrorResponse)?.error) {
    throw new Error(`Failed to retrieve aggregates for campaign ${campaignId}`);
  }

  return payload as ClassyCampaignOverview;
};

export const campaignRouter: Router = (() => {
  const router = express.Router();

  /**
   * Return the aggregates for a given campaign, including the amount raised, number of donors, and more.
   */
  router.get('/:campaignId/progress', async (req: Request, res: Response) => {
    try {
      const campaignId = parseInt(req.params.campaignId as string, 10);

      // Get the auth token for the Classy app.
      // This token should be cached in a fully fledged application, reusing it for subsequent requests while it's valid.
      const authResponse = await auth();

      // Get the aggregates for the campaign.
      const overviewResponse = await fetch(`${env.CLASSY_API_BASE_URL}/2.0/campaigns/${campaignId}/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authResponse.access_token}`,
        },
      });

      // Parse the data from the response
      const data = await validateOverviewResponse(campaignId, overviewResponse);

      res.status(StatusCodes.OK).send({
        success: true,
        payload: data,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: (error as Error)?.message || 'Internal Server Error',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  });

  return router;
})();
