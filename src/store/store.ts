import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchValueReducer from './reducers/searchValueSlice';
import limitValueReducer from './reducers/limitValueSlice';
import pageValueReducer from './reducers/pageValueSlice';
import cardValueReducer from './reducers/cardValueSlice';
import { cardsAPI } from '../services/cardsService';
import cardsFlagValueReducer from './reducers/cardsFlagValueSlice';
import cardIdValueReducer from './reducers/cardIdValueSlice';
import cardFlagValueReducer from './reducers/cardFlagValueSlice';

const rootReducer = combineReducers({
  searchValueReducer,
  limitValueReducer,
  pageValueReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  cardValueReducer,
  cardIdValueReducer,
  cardsFlagValueReducer,
  cardFlagValueReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
