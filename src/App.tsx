import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { cardsAPI } from './services/cardsService';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { ContextType } from './types/types';
import { cardsFlagValueSlice } from './store/reducers/cardsFlagValueSlice';

export const App: React.FC = () => {
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { page } = useAppSelector((state) => state.pageValueReducer);
  const { id } = useAppSelector((state) => state.cardIdValueReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsLoading } = cardsFlagValueSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchParams({
      name: query,
      page: page.toString(),
      limit: limit.toString(),
    });
  }, [query, page, limit, setSearchParams]);

  const { data: cards, isFetching } = cardsAPI.useGetCardsQuery({
    name: searchParams.get('name') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 8,
  });
  dispatch(setIsLoading(isFetching));

  return (
    <div className="app" id="app">
      <div className="main__container">
        <Search />
        {cards && <Cards cards={cards} />}
        {cards && <Pages cards={cards} />}
      </div>
      <Outlet context={{ id } satisfies ContextType} />
    </div>
  );
};

export default App;
