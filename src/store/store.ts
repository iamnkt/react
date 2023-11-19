import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import searchValueReducer from './reducers/searchValueSlice';
import limitValueReducer from './reducers/limitValueSlice';
import pageValueReducer from './reducers/pageValueSlice';
import cardValueReducer from './reducers/cardValueSlice';
import { cardsAPI } from '../services/cardsService';
import cardsFlagValueReducer from './reducers/cardsFlagValueSlice';
import cardIdValueReducer from './reducers/cardIdValueSlice';
import cardFlagValueReducer from './reducers/cardFlagValueSlice';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rootReducer = combineReducers({
  searchValueReducer,
  limitValueReducer,
  pageValueReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  cardValueReducer,
  cardIdValueReducer,
  cardsFlagValueReducer,
  cardFlagValueReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
