import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from './api/getCards';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { DataContext } from './context/context';
import { Data, CardDetail, ContextType } from './types/types';

export const DataProvider = DataContext.Provider;

export const App: React.FC = () => {
  const [query, setQuery] = React.useState<string>(
    localStorage.getItem('query') || ''
  );
  const [cards, setCards] = React.useState<Data[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(
    Number(localStorage.getItem('pageNumber')) || 1
  );
  const [cardsPerPage, setCardsPerPage] = React.useState<number>(
    Number(localStorage.getItem('cardsPerPage')) || 8
  );
  const [details, setDetails] = React.useState<CardDetail | null>(
    JSON.parse(localStorage.getItem('details') as string) || null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDetailsLoading, setIsDetailsLoading] =
    React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      q: `name:${query}*`,
      page: page.toString(),
      pageSize: cardsPerPage.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading!(true);

      const request = await getCards(searchParams);
      const { cards, totalCount } = await request;

      setIsLoading!(false);
      setTotalCount!(totalCount);
      setCards!(cards);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
          isDetailsLoading,
          setIsDetailsLoading,
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
