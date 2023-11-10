import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from './api/getCards';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { CardDetail, ContextType, Data, TDataContext } from './types/types';
import './App.css';

export const DataContext = createContext<TDataContext>(null!);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(
    localStorage.getItem('query') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const DataProvider = DataContext.Provider;

  useEffect(() => {
    setSearchParams({
      q: `name:${query}*`,
      page: page.toString(),
      pageSize: cardsPerPage.toString(),
    });
  }, [query, page, cardsPerPage, setSearchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const request = await getCards(searchParams);
      const { cards, totalCount } = await request;

      setIsLoading(false);
      setTotalCount(totalCount);
      setCards(cards);
    }
    fetchData();
  }, [searchParams]);

  return (
    <div className="app" id="app">
      <DataProvider
        value={{
          query,
          setQuery,
          cards,
          setCards,
          details,
          setDetails,
          page,
          totalCount,
          cardsPerPage,
          setPage,
          setCardsPerPage,
        }}
      >
        <div className="main__container">
          <Search />
          <Cards isLoading={isLoading} />
          <Pages isLoading={isLoading} />
        </div>
        <Outlet context={{ details, setDetails } satisfies ContextType} />
      </DataProvider>
    </div>
  );
};

export default App;
