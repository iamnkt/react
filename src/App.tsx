import React, { useState } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Data } from './types/types';
import View from './components/view/view';
import Pagination from './components/pagination/pagination';
import Search from './components/search/search';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<Data[]>([]);
  const [name, setName] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(8);

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
        <Search
          updateLoading={updateLoading}
          updateCard={updateCard}
          updateCards={updateCards}
          updateTotalCount={updateTotalCount}
          updateCurrentPage={updateCurrentPage}
          updateCardsPerPage={updateCardsPerPage}
          name={name}
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
        />
      }
    >
      <Route
        index
        element={
          <>
            <View loading={loading} data={cards} />
            <Pagination
              loading={loading}
              totalCount={totalCount}
              cardsPerPage={cardsPerPage}
              updateCurrentPage={updateCurrentPage}
              updateCardsPerPage={updateCardsPerPage}
            />
          </>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
