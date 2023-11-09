import React from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
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
  updateOverlay,
  overlay,
  name,
  cards,
  currentPage,
  loading,
  totalCount,
  cardsPerPage,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const buttonHandler = () => {
    searchParams.delete('id');
    updateOverlay();
    navigate(-1);
  };

  return overlay ? (
    <>
      <div className="main overlay" id="main" onClick={buttonHandler}>
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
        <Cards loading={loading} data={cards} updateOverlay={updateOverlay} />
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
  ) : (
    <>
      <div className="main" id="main">
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
        <Cards loading={loading} data={cards} updateOverlay={updateOverlay} />
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
