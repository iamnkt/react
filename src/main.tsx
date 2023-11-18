import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { router } from './router/router';
import { setupStore } from './store/store';

const store = setupStore();
export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
