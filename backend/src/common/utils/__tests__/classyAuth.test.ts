import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { env } from '@/common/utils/envConfig';

import { auth } from '../classyAuth';

describe('Classy auth', () => {
  it('success', async () => {
    const server = setupServer(
      http.post(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, () => {
        return HttpResponse.json({
          access_token: '123token',
        });
      })
    );

    server.listen();

    const response = await auth();

    expect(response.access_token).toEqual('123token');

    server.close();
  });

  it('Auth fails', async () => {
    const server = setupServer(
      http.post(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, () => {
        return HttpResponse.json({
          error: 'Failed to connect to Classy',
        });
      })
    );

    server.listen();

    await expect(() => auth()).rejects.toThrowError('The authentication with Classy failed.');

    server.close();
  });
});
