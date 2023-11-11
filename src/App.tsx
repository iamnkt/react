import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { DataContext } from './context/context';
import { Data, CardDetail, ContextType } from './types/types';

export const DataProvider = DataContext.Provider;

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>(
    localStorage.getItem('query') || ''
  );
  const [cards, setCards] = useState<Data[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem('pageNumber')) || 1
  );
  const [cardsPerPage, setCardsPerPage] = useState<number>(
    Number(localStorage.getItem('cardsPerPage')) || 8
  );
  const [details, setDetails] = useState<CardDetail | null>(
    JSON.parse(localStorage.getItem('details') as string) || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="app" id="app">
      <DataProvider
        value={{
          query,
          setQuery,
          cards,
          setCards,
          totalCount,
          setTotalCount,
          page,
          setPage,
          cardsPerPage,
          setCardsPerPage,
          details,
          setDetails,
          isLoading,
          setIsLoading,
        }}
      >
        <div className="main__container">
          <Search />
          <Cards />
          <Pages />
        </div>
        <Outlet context={{ details, setDetails } satisfies ContextType} />
      </DataProvider>
    </div>
  );
};

export default App;
