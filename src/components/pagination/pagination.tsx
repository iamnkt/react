import React from 'react';
import { PaginationProps } from '../../types/types';
import Dropdown from '../dropdown/dropdown';
import './pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  loading,
  totalCount,
  cardsPerPage,
  updateCurrentPage,
  updateCardsPerPage,
}) => {
  const pageNumbers = [];
  const options = [8, 12, 16];

  for (let i = 1; i <= Math.ceil(totalCount / cardsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const updatePage = (number: number) => {
    updateCurrentPage(number);
    localStorage.setItem('pageNumber', number.toString());
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="control">
      <div className="pagination">
        {pageNumbers.map((number) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              updatePage(number);
            }}
            key={number}
            href=""
            className="page-link link"
          >
            {number}
          </a>
        ))}
      </div>
      <div>
        <Dropdown
          updateCurrentPage={updateCurrentPage}
          updateCardsPerPage={updateCardsPerPage}
          options={options}
        />
      </div>
    </div>
  );
};

export default Pagination;
