# Mesto — React Client

A React photo-sharing interface for creating an account, editing a profile, and interacting with photo cards through a Mesto API.

## Live Demo

[Open Mesto](https://goldlexx.github.io/react-mesto-auth/)

## Features

- Registration and sign-in
- Protected profile and photo-card views
- Profile and avatar editing
- Add cards, like or unlike them, and remove cards you own

The app requires an API for account and card data; it does not simulate users or persistence.

## Tech Stack

- React 18
- React Router 6
- Create React App (`react-scripts`)
- JavaScript and CSS

## Getting Started

```bash
git clone https://github.com/goldlexx/react-mesto-auth.git
cd react-mesto-auth
npm ci
```

Set the API URLs in `.env.local`. For the compatible Mesto Worker:

```text
REACT_APP_API_BASE_URL=https://mesto-api.rustik-yuldashev.workers.dev
REACT_APP_AUTH_API_BASE_URL=https://mesto-api.rustik-yuldashev.workers.dev
```

Then start the development server with `npm start`. Do not put API credentials in `REACT_APP_*` variables; browser builds expose their values.

## Build and Test

```bash
npm test -- --watchAll=false
npm run build
```

## Project Background

The original client was created as a learning project during the Yandex Practicum web development course.
