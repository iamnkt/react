import React from 'react';
import { PagesProps } from '../../types/types';
import Dropdown from '../dropdown/dropdown';
import './styles.css';

const Pages: React.FC<PagesProps> = ({
  isLoading,
  page,
  totalCount,
  cardsPerPage,
  updatePage,
  updateCardsPerPage,
}) => {
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
          onClick={() => updatePage(1)}
          disabled={page === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          onClick={() => {
            if (page > 1) {
              updatePage(page - 1);
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
              updatePage(page + 1);
            }
          }}
          disabled={page === pagesCount}
        >
          &#62;
        </button>
        <button
          type="button"
          onClick={() => {
            updatePage(pagesCount);
          }}
          disabled={page === pagesCount}
        >
          &#62;&#62;
        </button>
      </div>
      <Dropdown
        updatePage={updatePage}
        updateCardsPerPage={updateCardsPerPage}
        options={options}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
};

export default Pages;
