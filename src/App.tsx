import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from './services/getCards';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { DataContext } from './context/context';
import { Data, CardDetail, ContextType } from './types/types';
import { useAppSelector } from './hooks/hooks';

export const DataProvider = DataContext.Provider;

export const App: React.FC = () => {
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { page } = useAppSelector((state) => state.pageValueReducer);

  const [cards, setCards] = React.useState<Data[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
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
      pageSize: limit.toString(),
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
          cards,
          setCards,
          totalCount,
          setTotalCount,
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
