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

Copy `.env.example` to `.env.local` and set the data and authentication API base URLs. `REACT_APP_API_TOKEN` is included in the public browser bundle and must not contain a private credential. The configured endpoints are the original project services; if they are unavailable, the app will show an API error message. No substitute backend or account data is simulated.

## Build and test

```sh
npm test -- --watchAll=false
npm run build
```
