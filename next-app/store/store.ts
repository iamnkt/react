import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cardsAPI } from '../services/cardsService';

export const makeStore = () =>
  configureStore({
    reducer: {
      [cardsAPI.reducerPath]: cardsAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(cardsAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
