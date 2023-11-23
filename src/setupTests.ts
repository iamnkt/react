import '@testing-library/jest-dom';
import { cardsAPI } from './services/cardsService';
import { setupStore } from './store/store';
import { server } from './__ tests __/__mocks__/api/server';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(cardsAPI.util.resetApiState());
});

afterAll(() => server.close());
