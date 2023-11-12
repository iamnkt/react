import React, { useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/context';
import ErrorButton from '../error-button/errorButton';
import './styles.css';

const Search: React.FC = () => {
  const { query, setQuery, setPage, cardsPerPage } = useContext(DataContext);
  const inputText = useRef<HTMLInputElement>(null);
  const [, setSearchParams] = useSearchParams();

  const buttonSearchHandler = () => {
    if (inputText.current) {
      setQuery!(inputText.current?.value.trim());
      localStorage.setItem('query', inputText.current?.value.trim());
      setPage!(1);
      setSearchParams({
        q: `name:${inputText.current?.value.trim()}*`,
        page: '1',
        pageSize: cardsPerPage.toString(),
      });
    }
  };

  return (
    <div className="search__container">
      <h2 className="search__title">Pokemon cards</h2>
      <div className="searh__form">
        <input
          data-testid="search-input"
          type="text"
          className="input input__search"
          placeholder="Pokemon name"
          defaultValue={localStorage.getItem('query') || query}
          ref={inputText}
        ></input>
        <button
          data-testid="search-button"
          className="button button__search"
          onClick={buttonSearchHandler}
        >
          Search
        </button>
        <ErrorButton />
      </div>
    </div>
  );
};

export default Search;
