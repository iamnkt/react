import React, { useEffect, useState } from 'react';
import { searchCards } from '../../api/api';
import { SearchProps } from '../../types/types';
import ErrorButton from '../error-button/errorButton';
import './search.css';

const Search: React.FC<SearchProps> = ({ loading, setItems }) => {
  const [pokemon, setPokemon] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemon(e.target.value);
  };

  const search = async (name: string) => {
    loading(true);

    const cards = await searchCards(name);

    loading(false);
    setItems(cards);
  };

  useEffect(() => {
    const request = localStorage.getItem('request');
    setPokemon(request || '');
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
          value={pokemon}
          onChange={handleChange}
        ></input>
        <button
          className="button button__search"
          onClick={() => {
            const request = pokemon.trim();
            search(request);
            if (localStorage.getItem('request'))
              localStorage.removeItem('request');
            localStorage.setItem('request', pokemon);
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
