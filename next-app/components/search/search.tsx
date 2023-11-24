import React, { useRef } from 'react';
import { DEFAULT_PAGE } from '../../utils/constants';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const { limit } = query;

  const inputText = useRef<HTMLInputElement>(null);

  const buttonSearchHandler = () => {
    const name = inputText.current?.value.trim() || '';
    router.push({ query: { name, page: 1, limit: limit || 8 } });
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
          defaultValue={router.query.name?.toString() || ''}
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
