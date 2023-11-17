import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/context';
import { useAppSelector } from '../../hooks/hooks';
import Dropdown from '../dropdown/dropdown';
import './styles.css';

const Pages: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);

  const { totalCount, page, setPage, isLoading } = useContext(DataContext);
  const options = [8, 12];
  const pagesCount = Math.ceil(totalCount / limit);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="pages__container">
      <div className="pages">
        <button
          type="button"
          data-testid="firstpage-button"
          onClick={() => {
            setPage!(1);
            setSearchParams({
              q: `name:${query}*`,
              page: '1',
              pageSize: limit.toString(),
            });
            localStorage.setItem('pageNumber', '1');
          }}
          disabled={page === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          data-testid="prevpage-button"
          onClick={() => {
            if (page > 1) {
              setPage!(page - 1);
              setSearchParams({
                q: `name:${query}*`,
                page: (page - 1).toString(),
                pageSize: limit.toString(),
              });
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
          data-testid="nextpage-button"
          onClick={() => {
            if (page < pagesCount) {
              setPage!(page + 1);
              setSearchParams({
                q: `name:${query}*`,
                page: (page + 1).toString(),
                pageSize: limit.toString(),
              });
              localStorage.setItem('pageNumber', String(page + 1));
            }
          }}
          disabled={page === pagesCount}
        >
          &#62;
        </button>
        <button
          type="button"
          data-testid="lastpage-button"
          onClick={() => {
            setPage!(pagesCount);
            setSearchParams({
              q: `name:${query}*`,
              page: pagesCount.toString(),
              pageSize: limit.toString(),
            });
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
