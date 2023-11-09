import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getCards } from './api/getCards';
import './App.css';
import Cards from './components/cards/cards';
import Pages from './components/pages/pages';
import Search from './components/search/search';
import { CardDetail, ContextType, Data } from './types/types';

export const SearchContext = createContext('');

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

  const updateQuery = (value: string) => {
    setQuery(value);
    localStorage.setItem('query', value);
  };

  const updateCards = (data: Data[]) => {
    setCards(data);
  };

  const updateTotalCount = (totalCount: number) => {
    setTotalCount(totalCount);
  };

  const updatePage = (pageNumber: number) => {
    setPage(pageNumber);
    localStorage.setItem('pageNumber', pageNumber.toString());
  };

  const updateCardsPerPage = (cardsNumber: number) => {
    setCardsPerPage(cardsNumber);
    localStorage.setItem('cardsPerPage', cardsNumber.toString());
  };

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
      updateTotalCount(totalCount);
      updateCards(cards);
    }
    fetchData();
  }, [searchParams]);

  return (
    <div className="app" id="app">
      <div className="main__container">
        <Search query={query} updateQuery={updateQuery} />
        <Cards isLoading={isLoading} data={cards} setDetails={setDetails} />
        <Pages
          isLoading={isLoading}
          totalCount={totalCount}
          updateCardsPerPage={updateCardsPerPage}
          updatePage={updatePage}
          page={page}
          cardsPerPage={cardsPerPage}
        />
      </div>
      <Outlet context={{ details, setDetails } satisfies ContextType} />
    </div>
  );
};

export default App;
