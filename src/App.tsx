import React, { useState } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Data } from './types/types';
import Details from './components/details/details';
import Main from './layouts/main';

export const App: React.FC = () => {
  const [overlay, setOverlay] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>([]);
  const [name, setName] = useState<string>(localStorage.getItem('card') || '');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem('pageNumber')) || 1
  );
  const [cardsPerPage, setCardsPerPage] = useState<number>(
    Number(localStorage.getItem('pageCards')) || 8
  );

  const updateOverlay = () => {
    overlay === false ? setOverlay(true) : setOverlay(false);
  };

  const updateCard = (name: string) => {
    setName(name);
  };

  const updateCards = (data: Data[]) => {
    setCards(data);
  };

  const updateLoading = (state: boolean) => {
    setLoading(state);
  };

  const updateTotalCount = (totalCount: number) => {
    setTotalCount(totalCount);
  };

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateCardsPerPage = (cardsNumber: number) => {
    setCardsPerPage(cardsNumber);
  };

  const routes = createRoutesFromElements(
    <Route
      path="/"
      element={
        <Main
          updateLoading={updateLoading}
          updateCards={updateCards}
          updateCard={updateCard}
          updateTotalCount={updateTotalCount}
          updateCurrentPage={updateCurrentPage}
          updateCardsPerPage={updateCardsPerPage}
          updateOverlay={updateOverlay}
          overlay={overlay}
          name={name}
          cards={cards}
          currentPage={currentPage}
          loading={loading}
          totalCount={totalCount}
          cardsPerPage={cardsPerPage}
        />
      }
    >
      <Route index element={null} />
      <Route
        path="details"
        element={<Details updateOverlay={updateOverlay} />}
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <div className="app" id="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
