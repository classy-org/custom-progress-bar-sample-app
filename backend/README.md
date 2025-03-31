# GoFundMe Pro Progress Bar Sample App

Sample NodeJS/Express backend to provide a REST API to query the fundraising progress of a GoFundMe Pro campaign.

This project is meant to be a simple example of how to connect to the GoFundMe Pro API, consume information about campaigns and expose it through a REST API. It is not meant to be a full-fledged application, nor to be used in production as-is.

## Getting Started

### Requirements

- Node.js 14+ (it's recommended to use [nvm](https://github.com/nvm-sh/nvm), and if so, you can run `nvm use` to switch to the correct Node.JS version)

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy the `.env.template` file to `.env` and update environment variables as needed. In particular, ensure that `GO_FUND_ME_PRO_CLIENT_ID` and `GO_FUND_ME_PRO_CLIENT_SECRET` are set. You can obtain these by creating a new application in the [GoFundMe Pro Developer Portal](https://developers.classy.org/).
4. Start the development server: `npm run dev`

## Project description

This project is meant as an example of how to consume the GoFundMe Pro APIs.
It provides a simple REST API with a single endpoint `/campaigns/:id` that returns the fundraising progress of a GoFundMe Pro campaign.

This project can be consumed directly, via an API platform like [Postman](https://www.postman.com/) or through our sample [frontend](../frontend/README.md) project.

## Project structure

This project uses [Express](https://expressjs.com/) to create a simple REST API with two routes defined in the `src/server.ts` file:

- `GET /health-check`: A simple health check endpoint that returns a 200 status code if the server is running.
- `GET /campaigns/:campaignId/progress`: An endpoint that returns the fundraising progress of a GoFundMe Pro campaign.

Each route group is handled by a separate router file inside the `src/api` folder.

Within the `src/common/utils/auth.ts` file, you will find the logic to authenticate with the GoFundMe Pro API using the client id and secret.
