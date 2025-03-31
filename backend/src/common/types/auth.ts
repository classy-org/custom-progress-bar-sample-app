export type GoFundMeProErrorResponse = {
  error: string | Record<string, string[]>;
};

export type GoFundMeProAuthResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
