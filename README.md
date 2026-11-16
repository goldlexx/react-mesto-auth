# Mesto — React authentication app

Mesto is a photo-sharing interface built with React. This repository contains the client application; registration, sign-in, profile, and card data require compatible Mesto data and authentication APIs.

## Run locally

```sh
git clone https://github.com/goldlexx/react-mesto-auth.git
cd react-mesto-auth
npm ci
npm start
```

## API configuration

Copy `.env.example` to `.env.local` and set the data and authentication API base URLs. This frontend does not accept or embed a cohort API token. If the data service requires a cohort credential, connect it through a trusted proxy that keeps the token server-side. Never put a token in a `REACT_APP_*` variable because it becomes public in the browser bundle. The app shows API errors when its configured services are unavailable; it does not simulate accounts or card data.

## Build and test

```sh
npm test -- --watchAll=false
npm run build
```
