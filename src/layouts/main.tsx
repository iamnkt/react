import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootProps } from '../types/types';
import Search from '../components/search/search';
import Cards from '../components/cards/cards';
import Pages from '../components/pages/pages';

const Main: React.FC<RootProps> = ({
  updateLoading,
  updateCards,
  updateCard,
  updateTotalCount,
  updateCurrentPage,
  updateCardsPerPage,
  name,
  cards,
  currentPage,
  loading,
  totalCount,
  cardsPerPage,
}) => {
  return (
    <>
      <div className="main">
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
        <Cards loading={loading} data={cards} />
        <Pages
          loading={loading}
          totalCount={totalCount}
          cardsPerPage={cardsPerPage}
          updateCurrentPage={updateCurrentPage}
          updateCardsPerPage={updateCardsPerPage}
        />
      </div>
      <Outlet />
    </>
  );
};

export default Main;
