export type ClassyErrorResponse = {
  error: string | Record<string, string[]>;
};

export type ClassyAuthResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
