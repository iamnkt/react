import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchValueReducer from './reducers/searchValueSlice';
import limitValueReducer from './reducers/limitValueSlice';
import pageValueReducer from './reducers/pageValueSlice';
import { cardsAPI } from '../services/cardsService';

const rootReducer = combineReducers({
  searchValueReducer,
  limitValueReducer,
  pageValueReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
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
