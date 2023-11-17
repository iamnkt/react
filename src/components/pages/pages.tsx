import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE, PAGE_SIZES } from '../../constants/constants';
import { DataContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { pageValueSlice } from '../../store/reducers/pageValueSlice';
import Dropdown from '../dropdown/dropdown';
import './styles.css';

const Pages: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const { query } = useAppSelector((state) => state.searchValueReducer);
  const { limit } = useAppSelector((state) => state.limitValueReducer);
  const { page } = useAppSelector((state) => state.pageValueReducer);
  const { setPage } = pageValueSlice.actions;
  const dispatch = useAppDispatch();

  const { totalCount, isLoading } = useContext(DataContext);
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
            dispatch(setPage(DEFAULT_PAGE));
            setSearchParams({
              q: `name:${query}*`,
              page: DEFAULT_PAGE.toString(),
              pageSize: limit.toString(),
            });
            localStorage.setItem('page', DEFAULT_PAGE.toString());
          }}
          disabled={page === DEFAULT_PAGE}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          data-testid="prevpage-button"
          onClick={() => {
            if (page > 1) {
              dispatch(setPage(page - 1));
              setSearchParams({
                q: `name:${query}*`,
                page: (page - 1).toString(),
                pageSize: limit.toString(),
              });
              localStorage.setItem('page', String(page - 1));
            }
          }}
          disabled={page === DEFAULT_PAGE}
        >
          &#60;
        </button>
        <button type="button">{`${page}`}</button>
        <button
          type="button"
          data-testid="nextpage-button"
          onClick={() => {
            if (page < pagesCount) {
              dispatch(setPage(page + 1));
              setSearchParams({
                q: `name:${query}*`,
                page: (page + 1).toString(),
                pageSize: limit.toString(),
              });
              localStorage.setItem('page', String(page + 1));
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
            dispatch(setPage(pagesCount));
            setSearchParams({
              q: `name:${query}*`,
              page: pagesCount.toString(),
              pageSize: limit.toString(),
            });
            localStorage.setItem('page', String(pagesCount));
          }}
          disabled={page === pagesCount}
        >
          &#62;&#62;
        </button>
      </div>
      <Dropdown options={[PAGE_SIZES.default, PAGE_SIZES.big]} />
    </div>
  );
};

export default Pages;
