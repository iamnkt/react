import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootProps } from '../../types/types';
import Pagination from '../pagination/pagination';
import Search from '../search/search';
import View from '../view/view';

const RootLayout: React.FC<RootProps> = ({
  updateLoading,
  updateCards,
  updateCard,
  updateTotalCount,
  updateCurrentPage,
  name,
  cards,
  currentPage,
  loading,
  totalCount,
  cardsPerPage,
  updateCardsPerPage,
}) => {
  return (
    <>
      <div className="left-section">
        <header className="header">
          <Search
            updateLoading={updateLoading}
            updateCard={updateCard}
            updateCards={updateCards}
            updateTotalCount={updateTotalCount}
            updateCurrentPage={updateCurrentPage}
            updateCardsPerPage={updateCardsPerPage}
            name={name}
            currentPage={currentPage}
            cardsPerPage={cardsPerPage}
          />
        </header>
        <main className="main">
          <View loading={loading} data={cards} />
          <Pagination
            loading={loading}
            totalCount={totalCount}
            cardsPerPage={cardsPerPage}
            updateCurrentPage={updateCurrentPage}
            updateCardsPerPage={updateCardsPerPage}
          />
        </main>
      </div>
      <div className="right-section">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
