import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import countriesReducer from './reducers/countriesSlice';
import dataReducer from './reducers/dataSlice';
import formsReducer from './reducers/formsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rootReducer = combineReducers({
  countriesReducer,
  dataReducer,
  formsReducer,
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
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
