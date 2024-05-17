import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export const healthCheckRouter: Router = (() => {
  const router = express.Router();

  // Ensure the sample app project backend is app and running
  router.get('/', async (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({
      success: true,
      message: 'Service is healthy',
      statusCode: StatusCodes.OK,
    });
  });

  return router;
})();
