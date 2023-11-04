import React, { useState } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Search from './components/search/search';
import { Data } from './types/types';
import View from './components/view/view';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>([]);

  const updateCards = (data: Data[]) => {
    setCards(data);
  };

  const updateLoading = (state: boolean) => {
    setLoading(state);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Search updateLoading={updateLoading} updateCards={updateCards} />
        }
      >
        <Route index element={<View loading={loading} data={cards} />}></Route>
        <Route path={'cards'} element={<View loading={loading} data={cards} />}>
          <Route />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
