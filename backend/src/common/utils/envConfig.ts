import dotenv from 'dotenv';
import { cleanEnv, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  GO_FUND_ME_PRO_API_BASE_URL: str(),
  GO_FUND_ME_PRO_CLIENT_ID: str(),
  GO_FUND_ME_PRO_CLIENT_SECRET: str(),
});
