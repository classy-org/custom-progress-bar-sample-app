import { GoFundMeProAuthResponse, GoFundMeProErrorResponse } from '../types/auth';
import { env } from './envConfig';

/**
 * This helper function sends a POST request to the GoFundMe Pro API to authenticate using oauth.
 * In order to do so, it requires the client id and secret for the GoFundMe Pro App to be located in
 * the `GO_FUND_ME_PRO_CLIENT_ID` and `GO_FUND_ME_PRO_CLIENT_SECRET` environment variables.
 * @returns {Promise<GoFundMeProAuthResponse>} The response from the GoFundMe Pro API.
 * @throws {Error} If the request fails or the response contains an error.
 */
export const auth = async () => {
  try {
    const response = await fetch(`${env.GO_FUND_ME_PRO_API_BASE_URL}/oauth2/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GO_FUND_ME_PRO_CLIENT_ID,
        client_secret: env.GO_FUND_ME_PRO_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();

    if ((data as GoFundMeProErrorResponse)?.error) {
      throw new Error(`Failed with error: ${(data as GoFundMeProErrorResponse).error}`);
    }

    return data as GoFundMeProAuthResponse;
  } catch (error) {
    console.error(error);
    throw new Error('The authentication with GoFundMe Pro failed.');
  }
};
