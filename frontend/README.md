# Classy Progress Bar Sample App

Sample React frontend to consume the sample `backend` that provides a REST API to query the fundraising progress of a Classy campaign.

This project is meant to be a simple example using [Vite](https://vitejs.dev/). It is not meant to be a full-fledged application, nor to be used in production as-is.

## Getting Started

### Requirements

- Node.js 14+ (it's recommended to use [nvm](https://github.com/nvm-sh/nvm), and if so, you can run `nvm use` to switch to the correct Node.JS version)

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy the `.env.template` file to `.env` and update environment variables as needed. In particular, ensure the localhost PORT matches the one you're using to serve the backend in the sample.
4. Start the development server: `npm run dev`

## Project description

This project is meant to be used in conjunction with the [backend](../backend/README.md) project. It provides a simple frontend to consume the backend API and display the fundraising progress of a Classy campaign.

The frontend is a React application bootstrapped using Vite.
The key file which contains the logic is `src/App.tsx`.
The progress bar is displayed using the `CircleGraph` component, built using SVG & CSS with basic animations. This file can be ignored if you're only interested in the API consumption logic.
