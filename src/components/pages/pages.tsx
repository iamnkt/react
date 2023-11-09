import React from 'react';
import { PaginationProps } from '../../types/types';
import Dropdown from '../dropdown/dropdown';
import './pages.css';

const Pages: React.FC<PaginationProps> = ({
  loading,
  totalCount,
  cardsPerPage,
  updateCurrentPage,
  updateCardsPerPage,
}) => {
  const pageNumbers = [];
  const options = [8, 12];

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
    <div className="pages-controls">
      <div className="pages">
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
      <Dropdown
        updateCurrentPage={updateCurrentPage}
        updateCardsPerPage={updateCardsPerPage}
        options={options}
      />
    </div>
  );
};

export default Pages;
