import React, { useRef } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { pageValueSlice } from '../../store/reducers/pageValueSlice';
import { searchValueSlice } from '../../store/reducers/searchValueSlice';
import './styles.css';

const Search: React.FC = () => {
  const { query } = useAppSelector((state) => state.searchValueReducer);
  // const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { setQuery } = searchValueSlice.actions;
  const { setPage } = pageValueSlice.actions;
  const dispatch = useAppDispatch();

  const inputText = useRef<HTMLInputElement>(null);
  // const [, setSearchParams] = useSearchParams();

  const buttonSearchHandler = () => {
    if (inputText.current) {
      dispatch(setQuery(inputText.current?.value.trim()));
      localStorage.setItem('query', inputText.current?.value.trim());
      dispatch(setPage(DEFAULT_PAGE));
      // setSearchParams({
      //   q: `name:${inputText.current?.value.trim()}*`,
      //   page: DEFAULT_PAGE.toString(),
      //   pageSize: limit.toString(),
      // });
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
