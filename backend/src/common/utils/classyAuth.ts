import { ClassyAuthResponse, ClassyErrorResponse } from '../types/auth';
import { env } from './envConfig';

/**
 * This helper function sends a POST request to the Classy API to authenticate using oauth.
 * In order to do so, it requires the client id and secret for the Classy App to be located in
 * the `CLASSY_CLIENT_ID` and `CLASSY_CLIENT_SECRET` environment variables.
 * @returns {Promise<ClassyAuthResponse>} The response from the Classy API.
 * @throws {Error} If the request fails or the response contains an error.
 */
export const auth = async () => {
  try {
    const response = await fetch(`${env.CLASSY_API_BASE_URL}/oauth2/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.CLASSY_CLIENT_ID,
        client_secret: env.CLASSY_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();

    if ((data as ClassyErrorResponse)?.error) {
      throw new Error(`Failed with error: ${(data as ClassyErrorResponse).error}`);
    }

    return data as ClassyAuthResponse;
  } catch (error) {
    console.error(error);
    throw new Error('The authentication with Classy failed.');
  }
};
