import React, { useContext } from 'react';
import { DataContext } from '../../App';
import { PagesProps } from '../../types/types';
import Dropdown from '../dropdown/dropdown';
import './styles.css';

const Pages: React.FC<PagesProps> = ({ isLoading }) => {
  const { totalCount, cardsPerPage, page, setPage } = useContext(DataContext);
  const options = [8, 12];
  const pagesCount = Math.ceil(totalCount / cardsPerPage);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="pages__container">
      <div className="pages">
        <button
          type="button"
          onClick={() => {
            setPage(1);
            localStorage.setItem('pageNumber', '1');
          }}
          disabled={page === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
              localStorage.setItem('pageNumber', String(page - 1));
            }
          }}
          disabled={page === 1}
        >
          &#60;
        </button>
        <button type="button">{`${page}`}</button>
        <button
          type="button"
          onClick={() => {
            if (page < pagesCount) {
              setPage(page + 1);
              localStorage.setItem('pageNumber', String(page + 1));
            }
          }}
          disabled={page === pagesCount}
        >
          &#62;
        </button>
        <button
          type="button"
          onClick={() => {
            setPage(pagesCount);
            localStorage.setItem('pageNumber', String(pagesCount));
          }}
          disabled={page === pagesCount}
        >
          &#62;&#62;
        </button>
      </div>
      <Dropdown options={options} />
    </div>
  );
};

export default Pages;
