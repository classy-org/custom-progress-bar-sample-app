# Custom Progress Bar Sample App

This is a sample application that demonstrates how to create a custom progress bar with your GoFundMe Pro data. It should be used purely as instructional material rather than a production-ready application.

Please refer to GoFundMe Pro's [developer documentation](https://developers.classy.org/overview/welcome) for more information about how to work with our product.

This application shell makes use of a
[Node backend layer](https://nodejs.org/en) to handle requests between the application and GoFundMe Pro's API as well as a [React frontend](https://react.dev/) to create a Client for the data retrieved from the customer's GoFundMe Pro account.

You can find the backend layer in the `/backend` folder (and setup instructions [here](/backend/README.md)) and the frontend part of the application in the `/frontend` folder (and setup instructions [here](/frontend/README.md)).

Please clone the repository and follow the instructions in the respective README files to get started.

## Requirements

- Node.js 14+ (it's recommended to use [nvm](https://github.com/nvm-sh/nvm), and if so, you can run `nvm use` to switch to the correct Node.JS version)

## Setup / Local Development

The backend can be run independently. The frontend depends on the backend.
Each can be run by following the setup on their respective README files, or you can run both at the same time by following these steps:

1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Review the README files in the `/backend` and `/frontend` folders for instructions on how to setup the .env files (third point in the setup for both)
4. Start the local server: `npm run start:local`
