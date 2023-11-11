import React, { useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCards } from '../../api/getCards';
import { DataContext } from '../../context/context';
import ErrorButton from '../error-button/errorButton';
import './styles.css';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    query,
    setQuery,
    page,
    cardsPerPage,
    setIsLoading,
    setCards,
    setTotalCount,
  } = useContext(DataContext);
  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchParams({
      q: `name:${query}*`,
      page: page.toString(),
      pageSize: cardsPerPage.toString(),
    });
  }, [query, page, cardsPerPage, setSearchParams]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading!(true);

      const request = await getCards(searchParams);
      const { cards, totalCount } = await request;

      setIsLoading!(false);
      setTotalCount!(totalCount);
      setCards!(cards);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const buttonSearchHandler = () => {
    if (inputText.current) {
      setQuery!(inputText.current?.value.trim());
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
