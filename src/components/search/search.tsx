import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { searchCards } from '../../api/api';
import { SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

const Search: React.FC<SearchProps> = ({ updateLoading, updateCards }) => {
  const [card, setCard] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value);
  };

  const handleSearch = async () => {
    const request = card.trim();
    setSearchParams({ q: `name:${request}*` });

    if (localStorage.getItem('request')) localStorage.removeItem('request');
    localStorage.setItem('request', card);
  };

  const search = async () => {
    updateLoading(true);

    const cards = await searchCards(searchParams);

    updateLoading(false);
    updateCards(cards);
  };

  useEffect(() => {
    const request = localStorage.getItem('request');
    setCard(request || '');
    search();
  }, []);

  useEffect(() => {
    console.log(searchParams.get('q'));
    search();
  }, [searchParams]);

  return (
    <>
      <header>
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

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Search;
