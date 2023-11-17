import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchValueReducer from './reducers/searchValueSlice';
import limitValueReducer from './reducers/limitValueSlice';
import pageValueReducer from './reducers/pageValueSlice';

const rootReducer = combineReducers({
  searchValueReducer,
  limitValueReducer,
  pageValueReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
