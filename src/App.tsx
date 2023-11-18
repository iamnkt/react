import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { cardsAPI } from './services/cardsService';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { DataContext } from './context/context';
import { CardDetail, ContextType } from './types/types';
import { useAppSelector } from './hooks/hooks';

export const DataProvider = DataContext.Provider;

export const App: React.FC = () => {
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { page } = useAppSelector((state) => state.pageValueReducer);

  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [details, setDetails] = React.useState<CardDetail | null>(
    JSON.parse(localStorage.getItem('details') as string) || null
  );
  const [isDetailsLoading, setIsDetailsLoading] =
    React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      name: query,
      page: page.toString(),
      limit: limit.toString(),
    });
  }, [query, page, limit, setSearchParams]);

  const { data: cards } = cardsAPI.useGetCardsQuery({
    name: searchParams.get('name') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 8,
  });

  return (
    <div className="app" id="app">
      <DataProvider
        value={{
          totalCount,
          setTotalCount,
          details,
          setDetails,
          isDetailsLoading,
          setIsDetailsLoading,
        }}
      >
        <div className="main__container">
          <Search />
          {cards && <Cards cards={cards} />}
          <Pages />
        </div>
        <Outlet context={{ details, setDetails } satisfies ContextType} />
      </DataProvider>
    </div>
  );
};

export default App;
