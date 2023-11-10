import React, { useContext, useRef } from 'react';
import { DataContext } from '../../App';
import ErrorButton from '../error-button/errorButton';
import './styles.css';

const Search: React.FC = () => {
  const { query, setQuery } = useContext(DataContext);
  const inputText = useRef<HTMLInputElement>(null);

  const buttonSearchHandler = () => {
    if (inputText.current) {
      setQuery(inputText.current?.value.trim());
      localStorage.setItem('query', inputText.current?.value.trim());
    }
  };

  return (
    <div className="search__container">
      <h2 className="search__title">Pokemon cards</h2>
      <div className="searh__form">
        <input
          type="text"
          className="input input__search"
          placeholder="Pokemon name"
          defaultValue={query}
          ref={inputText}
        ></input>
        <button className="button button__search" onClick={buttonSearchHandler}>
          Search
        </button>
        <ErrorButton />
      </div>
    </div>
  );
};

export default Search;
