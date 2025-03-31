import { useEffect, useState } from 'react';
import { CircleGraph } from './circleGraph/CircleGraph';
import './App.css';

// --- Response type definition for the backend /campaign/:campaignId/progress endpoint ---

type SuccessResponse = {
  success: true;
  // Only the information used is typed, the endpoint actually returns more data.
  payload: {
    gross_amount: number;
    percent_to_goal: number;
  };
};

type ErrorResponse = {
  success: false;
  message: string;
};

type Response = SuccessResponse | ErrorResponse;

// --- End of response type definition ---

/**
 * Basic UI that fetches the information from the backend (see backend folder for more)
 * and renders a circle progress bar UI.
 */
function App() {
  const [campaignData, setCampaignData] = useState<SuccessResponse['payload'] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    // Query the backend to get the information (the backend will in turn query the GoFundMe Pro API)
    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/campaigns/${import.meta.env.VITE_CAMPAIGN_ID}/progress`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = (await response.json()) as Response;

        if (!data.success) {
          throw new Error(data.message);
        }

        setCampaignData(data.payload);
      } catch (error) {
        setError((error as Error)?.message || 'Failed to fetch info');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className={`card${error ? ' card-error' : ''}`}>
      {isLoading && <p className="loadingMessage">Loading information...</p>}
      {!isLoading && (
        <>
          {!!error && <p className="errorMessage">{error}</p>}
          {!error && (
            <>
              <div className="infoContainer">
                <p className="totalRaisedLabel">Total Raised</p>
                <p className="totalRaisedAmount">${campaignData?.gross_amount}</p>
              </div>
              <CircleGraph percentage={campaignData?.percent_to_goal} size={140} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
