import { Api } from './api';

const createApi = () => new Api({
  url: 'https://api.example.test/',
  headers: {
    authorization: 'test-token',
    'Content-Type': 'application/json',
  },
});
const originalFetch = global.fetch;

afterEach(() => {
  jest.restoreAllMocks();
  global.fetch = originalFetch;
});

test('sends a new card with JSON data and the authorization header', async () => {
  const response = { ok: true, json: jest.fn().mockResolvedValue({ _id: 'card-1' }) };
  global.fetch = jest.fn().mockResolvedValue(response);

  await expect(createApi().addNewCard({ name: 'Lake', link: 'https://example.test/lake.jpg' }))
    .resolves.toEqual({ _id: 'card-1' });

  expect(global.fetch).toHaveBeenCalledWith('https://api.example.test/cards', {
    method: 'POST',
    headers: expect.objectContaining({ authorization: 'test-token' }),
    body: JSON.stringify({ name: 'Lake', link: 'https://example.test/lake.jpg' }),
  });
});

test('rejects unsuccessful API responses', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 403 });

  await expect(createApi().getCardList()).rejects.toBe('Ошибка: 403');
});
