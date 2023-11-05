import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { searchCards } from '../../api/api';
import { SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

const Search: React.FC<SearchProps> = ({
  updateLoading,
  updateCard,
  updateCards,
  updateTotalCount,
  updateCurrentPage,
  name,
  currentPage,
  cardsPerPage,
}) => {
  const [card, setCard] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value.trim());
  };

  const handleSearch = () => {
    updateCard(card.trim());
    updateCurrentPage(1);
    localStorage.removeItem('page');

    setSearchParams({
      q: `name:${card}*`,
      page: '1',
      pageSize: cardsPerPage.toString(),
    });

    if (localStorage.getItem('card')) localStorage.removeItem('card');
    localStorage.setItem('card', card);
  };

  const search = async () => {
    updateLoading(true);

    const request = await searchCards(searchParams);
    const { cards, totalCount } = await request;

    updateLoading(false);
    updateTotalCount(totalCount);
    updateCards(cards);
  };

  useEffect(() => {
    const lsCard = localStorage.getItem('card');
    setCard(lsCard || '');
  }, []);

  useEffect(() => {
    setSearchParams({
      q: `name:${name}*`,
      page: currentPage.toString(),
      pageSize: cardsPerPage.toString(),
    });
  }, [name, currentPage, cardsPerPage, setSearchParams]);

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <header className="header">
        <div className="search">
          <h2 className="caption">Pokemon cards</h2>
          <div className="search-form">
            <input
              type="text"
              className="input"
              placeholder="Pokemon name"
              value={card}
              onChange={handleInputChange}
            ></input>
            <button className="button button__search" onClick={handleSearch}>
              Search
            </button>
            <ErrorButton />
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Search;
