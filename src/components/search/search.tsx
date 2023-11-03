import React, { useEffect, useState } from 'react';
import { searchCards } from '../../api/api';
import { SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

const Search: React.FC<SearchProps> = ({ updateLoading, updateCards }) => {
  const [card, setCard] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard(e.target.value);
  };

  const search = async (card: string) => {
    updateLoading(true);

    const cards = await searchCards(card);

    updateLoading(false);
    updateCards(cards);
  };

  useEffect(() => {
    const request = localStorage.getItem('request');
    setCard(request || '');
    search(request?.trim() || '');
  }, []);

  return (
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
        <button
          className="button button__search"
          onClick={() => {
            const request = card.trim();
            search(request);
            if (localStorage.getItem('request'))
              localStorage.removeItem('request');
            localStorage.setItem('request', card);
          }}
        >
          Search
        </button>
        <ErrorButton />
      </div>
    </div>
  );
};

export default Search;
