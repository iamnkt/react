import React, { useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { searchValueSlice } from '../../store/reducers/searchValueSlice';
import './styles.css';

const Search: React.FC = () => {
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { setQuery } = searchValueSlice.actions;
  const dispatch = useAppDispatch();

  const { limit } = useAppSelector((state) => state.limitValueReducer);

  const { setPage } = useContext(DataContext);
  const inputText = useRef<HTMLInputElement>(null);
  const [, setSearchParams] = useSearchParams();

  const buttonSearchHandler = () => {
    if (inputText.current) {
      dispatch(setQuery(inputText.current?.value.trim()));
      localStorage.setItem('query', inputText.current?.value.trim());
      setPage!(1);
      setSearchParams({
        q: `name:${inputText.current?.value.trim()}*`,
        page: '1',
        pageSize: limit.toString(),
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
          defaultValue={query}
          ref={inputText}
        ></input>
        <button
          data-testid="search-button"
          className="button button__search"
          onClick={buttonSearchHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
