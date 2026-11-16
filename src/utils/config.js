export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  'https://mesto.nomoreparties.co/v1/cohort-41';

export const AUTH_API_BASE_URL =
  (process.env.REACT_APP_AUTH_API_BASE_URL || 'https://auth.nomoreparties.co').replace(/\/+$/, '');
